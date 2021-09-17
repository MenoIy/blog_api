import nodemailer from "nodemailer"
import dotenv from 'dotenv'

dotenv.config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
});

export const sendMail = (to : string, subject : string, body : string) => {
    transporter.sendMail({
        from : process.env.EMAIL,
        to : to,
        subject : subject,
        text : body
    }, (error , info) => {
        if (error) {
            console.log(error);
        }
        console.log(info);
    })
}
