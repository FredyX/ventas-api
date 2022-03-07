const nodemailer = require("nodemailer")
const {emailConfig} = require("../config/email.config");

const transporter = nodemailer.createTransport(emailConfig);

//, content, agregados 
const generarEmail = (emailDestino, contenido , asunto) => {
    let emailOptions = {
        from: "Remitente",
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
const generarContenidoLoggin = (nombre) => {
    return `Se ha registrado un nuevo inicio de sesion en ventasHN\n\n${nombre},si no fue tu operacion, por favor cambia tu contraseña.\n\nQue tengas un buen dia.\n\n`;
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
    generarContenidoLoggin
}

