const nodemailer = require('nodemailer')
require('dotenv').config();

async function sendMail (mailOptions) {
    const smtpTransport = nodemailer.createTransport({ 
    service: 'SendGrid',
    auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_KEY
    }
    });

    mailOptions = {
    ...mailOptions,
    from: process.env.SENDGRID_SENDER
    };

    await smtpTransport.sendMail(mailOptions, function (err) {
    if(err) {console.log(err); return err}
    return { status: 'success', message: 'An e-mail has been sent.' }
    });
}

module.exports = {
    sendMail,
}