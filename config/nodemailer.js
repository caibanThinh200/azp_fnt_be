import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import fs from "fs";
import ejs from "ejs";
import juice from "juice"
import LayoutModel from "../Model/layout";

const sendEmail = async (
    receiver,
    subject,
    params
) => {
    try {
        const bussinessInfo = await LayoutModel.findOne();
        const getReceiver = `${receiver?.replace("@gmail.com", "")}<${receiver}>`
        const transporter = nodemailer.createTransport(smtpTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                // user: bussinessInfo?.emails[0], open on release
                user: "thinhdev20@gmail.com",
                pass: process.env.SMTP_AUTH_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        }));
        const templatePath = `./template/mail.html`;
        const options = {
            from: 'thinhdev20@gmail.com',
            to: getReceiver,
            subject: subject,
            // html: html,
        };
        if (fs.existsSync(templatePath)) {
            const template = fs.readFileSync(templatePath, "utf-8");
            const html = ejs.render(template, params);
            // templateVars là các biến được truyền vào template thông qua hàm render
            // const text = convert(html);
            const htmlWithStylesInlined = juice(html);

            options.html = htmlWithStylesInlined;
            //options.text = text;
        }
        // console.log(email, subject, html)
        await transporter.sendMail(options).then((res) => console.log(res))
    } catch (error) {
        console.log("email not sent");
        console.log(error);
    }
};

export default sendEmail;