import nodemailer from 'nodemailer'

export const sendMail = async (ticket,purchaser) =>
{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port:587,
        secure:false,
        auth:
        {
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_KEY
        },
        tls: {
            rejectUnauthorized: false
          }
    })

    const mail = {
        from: 'franco.pisapia405@gmail.com',
        to: purchaser,
        subjetc: 'Compra realizada con exito',
        html:`
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1>Ticket de compra</h1>
        </div>
        <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 20px;">
          <h2 style="margin-top: 0;">Código de ticket: ${ticket.code}</h2>
          <p style="margin-bottom: 5px;">Fecha y hora de compra: ${ticket.purchase_datetime}</p>
          <p style="margin-bottom: 5px;">Total de la compra: $${ticket.amount}</p>
          <p style="margin-bottom: 5px;">Comprador: ${ticket.purchaser}</p>
        </div>
        <p>Gracias por tu compra. Esperamos que disfrutes de tus productos.</p>
        <p>¡Vuelve pronto!</p>
      </div>
        `
    }

    return await transporter.sendMail(mail)
}