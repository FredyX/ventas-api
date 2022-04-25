const nodemailer = require("nodemailer")
const {emailConfig} = require("../config/email.config");
const path = require('path');

const transporter = nodemailer.createTransport(emailConfig);

const generarEmail = (emailDestino, contenido , asunto) => {
    let emailOptions = {
        from: "SWAPPER",
        to: emailDestino,
        subject: asunto,
        text: contenido,
        attachment: [{
            path: null
        }]
    }
    return emailOptions;
}

const generarContenidoRegistro = (nombre, apellido) => {
    return `Bienvenido a ventasHN\nQuerido ${nombre} ${apellido}, \n\n Gracias por registrarte en ventasHN, el sitio donde encontraras siempre publicaciones de cerca de ti y tendras la opcion de ofrecer tus productos o servicios, recuerda revisar nuestra politica de privacidad y terminos y condiciones.\n\nQue tengas un buen dia\n\n`;
}

const generarEmailPDF = (emailDestino, pdfName) => {
    const mailOptions = {
        from: "SWAPPER",
        to: emailDestino,
        subject: "Ofertas de la semana",
        text: "Aqui le presentamos las ofertas de la semana",
        attachments: [
            {
                filename: pdfName,
                path: path.join(__dirname, '../public/pdf/' + pdfName),
                contentType: 'application/pdf'
            }
        ]
    };
    return mailOptions;
}


const enviarEMail = (emailOptions) => {
    transporter.sendMail(emailOptions, (err, inf)=>{
        if (err) {
            console.log(err.message);
        }
        else {
            console.log("Email Enviado");
        }
    });
}

module.exports = {
    enviarEMail,
    generarContenidoRegistro,
    generarEmail,
    generarEmailPDF
}

