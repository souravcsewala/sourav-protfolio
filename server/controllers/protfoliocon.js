const path = require('path');
const contactmodel = require("../models/protfoliomodel");
const nodemailer = require("nodemailer");

const getdownload = (req, res) => {
    try {
        const filePath = path.join(__dirname, '..', 'public', 'SOURAV CV.PDF');
        console.log(__dirname);
        console.log(filePath);
        res.download(filePath, 'SOURAV CV.PDF', (err) => {
            if (err) {
                console.error('Error downloading file: ', err);
                return res.status(404).send('File not found from server');
            }
        });
    } catch (error) {
        console.log("error from download page", error);
        return res.status(500).send('Internal Server Error');
    }
};

const Mailsend = (name, email, msg) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.USERMAILID,
                pass: process.env.MAILENTRY
            }
        });

        transporter.sendMail({
            from: process.env.USERMAILID,
            to: email,
            subject: "THANKS FOR CONTACTING ME",
            html: `<p>Hi ${name}, thank you for your valuable message. I will contact you very soon. You can download my resume from my portfolio on the home section. HAVE A NICE DAY!</p>`
        }, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Mail has been sent:", info.response);
            }
        });

        transporter.sendMail({
            from: process.env.USERMAILID,
            to: process.env.ADMINMAILID,
            subject: "MAIL MESSAGE FROM USER",
            html: `<p>${msg}. From user ${name}. User's email is ${email}</p>`
        }, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Mail has been sent:", info.response);
            }
        });
    } catch (error) {
        console.log("Error from sendMail function", error);
    }
};

const getcontact = async (req, res) => {
    const response = req.body;
    try {
        const contactinfo = await contactmodel.create(response);
        Mailsend(contactinfo.username, contactinfo.email, contactinfo.msg);
        return res.status(200).send({ message: "Message sent successfully", contactinfo });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Message not delivered" });
    }
};

module.exports = { getdownload, getcontact };
