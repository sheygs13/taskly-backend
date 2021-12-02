// require('dotenv').config();
const sgMail = require('@sendgrid/mail');

const SENDGRID_API_KEY = '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';

// console.log({ key: process.env.SENDGRID_API_KEY });

sgMail.setApiKey(SENDGRID_API_KEY);

const welcomeEmail = async (name, email) => {
        try {
                const mailOptions = {
                        from: 'segun.ekoh@gmail.com',
                        to: email,
                        subject: 'THANKS FOR JOINING IN!',
                        html: `<p>Hi <strong>${name}</strong>, welcome to task manager. Thanks for joining.</p>`,
                };
                await sgMail.send(mailOptions);
        } catch ({ message }) {
                console.log(message);
        }
};

const cancelationMail = async (name, email) => {
        try {
                const mailOptions = {
                        from: 'segun.ekoh@gmail.com',
                        to: email,
                        subject: 'SORRY TO SEE YOU GO!',
                        html: `<p>Hi <strong>${name}</strong>, we're sorry to see you go!.</p>`,
                };
                await sgMail.send(mailOptions);
        } catch ({ message }) {}
};

module.exports = {
        welcomeEmail,
        cancelationMail,
};
