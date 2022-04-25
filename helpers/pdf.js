const { QueryTypes } = require('sequelize');
const { generarEmailPDF, enviarEMail } = require('./email.js');
const { Suscriptions, Suscriptions_categories, Users, sequelize } = require('../config/db.config');
const pdf = require('html-pdf');
const path = require('path');
const fs = require('fs');

const loadSuscriptionsByDay = async (day) => {
    let r = [];
    const response1 = await Suscriptions.findAll({
        where: {
            preferred_day: day
        }
    });


    for (let i = 0; i < response1.length; i++) {
        const { id,
            user_id,
            department_id,
            order_prior,
            min_seller_score,
            preferred_day } = response1[i].dataValues;

        const response2 = await Suscriptions_categories.findAll({
            where: {
                suscription_id: id
            }
        });

        let sus = {
            id,
            user_id,
            department_id,
            order_prior,
            min_seller_score,
            preferred_day
        };

        sus.categories = response2.map(category => category.categorie_id);
        r.push(sus);
    };

    return r;
}

const sendEmails = async (suscriptions) => {
    console.log('Enviando correos');

    for (let i = 0; i < suscriptions.length; i++) {
        const pdf_name = "SWAPPER" + Date.now() + suscriptions[i].user_id + '.pdf';
        const pdf_path = path.join(__dirname, '../public/pdf/'+pdf_name); 
        const products = await loadProductsBySuscriptions(suscriptions[i]);
        const html = generarHTML(products);

        pdf.create(html).toFile(pdf_path, async (err, res) =>{
            if (err) return console.log(err);

            const user = await Users.findOne({
                where: {
                    id: suscriptions[i].user_id
                }
            });
            const { user_email } = user.dataValues;
    
            const email = generarEmailPDF(user_email, pdf_name);
            enviarEMail(email);
        });

    }
}


const generarHTML = (products) => {
    let html = `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Suscripciones</title>
        <style>
        .producto {
            display: flex;
            flex-direction: column;
            width: max-content;
            border: 2px solid rgb(172, 166, 166);
            user-select: none;
            text-align: center;
            margin-top: 25px;
        }
        .producto img{
            width: 300px;
            height: 300px;
            object-fit:scale-down;
        }
        .producto h3 {
            color: rgb(18, 183, 0);
            font-size: 2rem;
            font-weight: bolder;
        }
        .producto h4 {
            color: rgb(0, 0, 0);
            font-size: 1.3rem;
            font-weight: bolder;
        }
        .card{
            position: relative;
            margin-bottom: 1rem;
        }
        .productos {
            column-count: 1;  

        }.producto P{
            color: rgb(0, 0, 255);
            font-size: 1.5rem;
        }
        h1{
            text-align: center;
        }
        </style>
    </head>
    <body>
        <h1>SWAPPER</h1>
        <div class="productos">
            <div class="row">`;
    for (let i = 0; i < products.length; i++) {
        html += `
        <div class="producto">
            <div class="card">
                <img src="${products[i].image_path}" alt="">
            </div>
            <h3>${products[i].product_name}</h3>
            <h4> Lps. ${products[i].price}</h4>
            <h4> Link: </h4>
            <P>${products[i].link}</P>
        </div>
        `;
    }
    html += `</div>
        </div>
    </body>
    </html>`;
    return html;
}

const loadProductsBySuscriptions = async (suscription) => {
    let r = {};
    const cats = suscription.categories;
    const products = await sequelize.query(`SELECT DISTINCT products.id,product_name,price,state,date_added,department_name,first_name,last_name,score, image_name,image_data FROM products join departments on products.department_id = departments.id join users on products.user_seller_id = users.id join images on images.product_id=products.id join products_categories on products.id = products_categories.product_id WHERE (categorie_id in (${cats}) AND products.department_id in (${suscription.department_id}) AND score >= ${suscription.min_seller_score}) ORDER BY price DESC`, { type: QueryTypes.SELECT });

    if (!products) {
        r = 'No hay productos disponibles';
    }
    else {
        let quantity = products.length;

        let data = products.map(
            (product) => {
                const { id, product_name, price, date_added, department_name, first_name, last_name, score, image_name, image_data } = product;

                fs.writeFileSync(path.join(__dirname,
                    '../public/dbimages/' + image_name), image_data);

                const p = {
                    link: 'http://localhost:8081/detalles/?id=' + id,
                    product_name,
                    price,
                    date_added,
                    department_name,
                    seller_name: first_name + ' ' + last_name,
                    score,
                    image_path: 'http://localhost:3001/' + image_name
                }
                return p
            }
        )
        r = data;
    }
    return r;
}

module.exports = {
    loadSuscriptionsByDay,
    sendEmails
}