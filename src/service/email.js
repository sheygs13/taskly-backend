require('dotenv').config();

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const welcomeEmail = async (name, email) => {
        try {
                const mailOptions = {
                        from: 'segun.ekoh@gmail.com',
                        to: email,
                        subject: 'THANKS FOR JOINING IN!',
                        html: `<p>Hi <strong>${name}</strong>, welcome to taskly service. Thanks for joining.</p>`,
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
                        html: `<p>Goodbye <strong>${name}</strong>, I hope to see you something soon.</p>`,
                };
                await sgMail.send(mailOptions);
        } catch ({ message }) {
                console.log(message);
        }
};

module.exports = {
        welcomeEmail,
        cancelationMail,
};
