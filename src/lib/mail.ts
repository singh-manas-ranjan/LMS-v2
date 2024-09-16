import nodemailer from "nodemailer";

type EmailOptions = {
  name: string;
  email: string;
  subject: string;
  content: string;
};

export const sendEmail = async ({
  name,
  email,
  subject,
  content,
}: EmailOptions) => {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    await transporter.verify();
  } catch (error) {
    console.log("Error verifying SMTP:", error);
    return;
  }

  const emailBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
        }
        .header h1 {
          color: #333;
        }
        .content {
          font-size: 16px;
          line-height: 1.5;
          color: #555;
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          color: #ffffff;
          background-color: #007bff;
          border-radius: 4px;
          text-decoration: none;
        }
        .button:hover {
          background-color: #0056b3;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${subject}</h1>
        </div>
        <div class="content">
          <p>Hello ${name},</p>
          ${content}
          <p>If you did not request this, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 Learnopia. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const sendResult = await transporter.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject,
      html: emailBody,
    });
    console.log("Email sent:", sendResult);
  } catch (error) {
    console.log("Error sending email:", error);
  }
};
