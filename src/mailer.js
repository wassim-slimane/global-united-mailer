require("dotenv").config()
const fs = require('fs');
const handlebars = require('handlebars');

const {transporter} = require('./transporter');

async function sendEmail(form) {

    // Generate html template to send with data
    const htmlSource = fs.readFileSync('./mail-templates/contact-form.html', 'utf-8');
    const htmlTemplate = handlebars.compile(htmlSource);
    const htmlToSend = htmlTemplate(form);

    // Set mail options
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: 'GLOBAL UNITED FC - Pre-Registration',
        text: `Name: ${form.fullName}, Age: ${form.age}, Email: ${form.email}, Message: ${form.message}`,
        html: htmlToSend
    };

    return await transporter.sendMail(mailOptions);
}

module.exports = {sendEmail};

