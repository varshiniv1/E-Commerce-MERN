import { createTransport } from 'nodemailer';
import Mailgen from 'mailgen';
import dotenv from 'dotenv';

dotenv.config();

let transporter = createTransport({
    service: "Gmail",
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const registerEmail = async (userEmail, user) => {
    try {
        const emailToken = user.generateRegisterToken();
        let mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Waves guitars",
                link: `${process.env.EMAIL_MAIL_URL}`
            }
        });

        const email = {
            body: {
                name: userEmail,
                intro: 'Welcome to Waves! We\'re very excited to have you on board.',
                action: {
                    instructions: 'To validate your account, please click here:',
                    button: {
                        color: '#1a73e8',
                        text: 'Validate your account',
                        link: `${process.env.SITE_DOMAIN}verification?t=${emailToken}`
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email; we\'d love to help.'
            }
        }

        let emailBody = mailGenerator.generate(email);
        let message = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: "Welcome to Waves",
            html: emailBody
        };

        await transporter.sendMail(message);
        return true;
    } catch (error) {
        throw error;
    }
}

export default {
    registerEmail
};
