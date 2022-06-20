import {createTransport} from 'nodemailer';
import dotenv from 'dotenv';
import logger from './logger.js';

dotenv.config();

const transporterGmail = createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: process.env.USER_GMAIL,
      pass: process.env.PASS_GMAIL,
    },
});
  
const sendMailGmail = async (to, subject, text, att, nombre, html) => {
    const mail = {
        from: `"${nombre}" <${process.env.USER_GMAIL}>`,
        to: to,
        subject: subject
    }
    if (text!=''){
        mail.text= text;
    } else {
        mail.html = html 
    }
    if (att!='') {
        const adj = {path: att}
        mail.attachments = [adj]
    }
    try {
        const rsdo = await transporterGmail.sendMail(mail);
        logger.info(`MAIL ENVIADO A: ${to} CON: ${att} - RESPUESTA: ${rsdo.response}`);
    } catch (error) {
        logger.error(`ERROR AL ENVIAR CORREO A: ${to} - ERROR: ${error.response}`);
    }
}

export default sendMailGmail;