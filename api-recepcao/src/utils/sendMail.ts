import nodemailer from "nodemailer";

export async function sendMail(to: string, subject: string, text: string) {
  const transporter = nodemailer.createTransport({
    host: "mail.itapecerica.sp.gov.br", // servidor de email
    port: 25,
    secure: false, // true para porta 465
    auth: {
      user: "miguel.moraes@itapecerica.sp.gov.br",
      pass: "Smile@614", // não é sua senha normal
    },
  });

  const mailOptions = {
    from: '"Tecnologia - Itapecerica da Serra" <miguel.moraes@itapecerica.sp.gov.br>',
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
}
