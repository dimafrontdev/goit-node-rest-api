import nodemailer from 'nodemailer';
import 'dotenv/config';

const {
  BASE_URL,
  EMAIL_HOST,
  EMAIL_USER,
  EMAIL_PASSWORD,
  EMAIL_FROM,
  EMAIL_PORT,
} = process.env;

const config = {
  host: EMAIL_HOST,
  port: Number(EMAIL_PORT),
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(config);

const sendEmail = async data => {
  const options = { ...data, from: `${EMAIL_FROM} <${EMAIL_USER}>` };
  return transport.sendMail(options);
};

export const sendVerificationEmail = async (email, verificationToken) => {
  const verifyLink = `${BASE_URL}/api/auth/verify/${verificationToken}`;
  const subject = 'Please, verify your email';

  return sendEmail({
    to: email,
    subject,
    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${subject}</title>
      </head>
        <body>
        <h1>Verify your email</h1>
        <p>Verify this email address by clicking the link below.</p>
        </br>
        <a target="_blank" href="${verifyLink}">Verify your email</a>
        </br>
        
        <p>If you did not request to verify account, you can safely ignore this email.</p>
     
        </br>
        <p>Best regards</p>
        <p>The XXX app</p>
      </body>
    </html>
    `,
  });
};
