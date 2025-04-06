// lib/sendEmail.js
import nodemailer from "nodemailer";

export async function sendEmail({ toEmail, username, theId }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "youremail@gmail.com",      // 👈 Thay bằng email thật
      pass: "yourapppassword",          // 👈 App password (không phải mật khẩu Gmail thường)
    },
  });

  const mailOptions = {
    from: '"Bike App" <tienbi63543@gmail.com>',
    to: toEmail,
    subject: "Thanh toán thẻ thành công",
    text: `Xin chào ${username}, bạn đã thanh toán thẻ ${theId} thành công.`,
  };

  await transporter.sendMail(mailOptions);
}
