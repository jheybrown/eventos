const nodemailer = require('nodemailer');
const qrcode = require('qrcode');

// Configuração do transporte de e-mail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
     user: process.env.EMAIL_USER || 'jossefa.muxlhanga@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'vmbl uybx xfdo tzwq'
    }
});

// Função para enviar e-mail com QR Code
exports.sendEmailWithQRCode = async (to, subject, eventId) => {
    try {
        // Gerar QR Code
        const qrCodeData = `http://localhost:3000/confirm/${eventId}`; // Link de confirmação
        const qrCodeImage = await qrcode.toDataURL(qrCodeData);

        // Configuração do e-mail
        const mailOptions = {
            from: 'jossefa.muxlhanga@gmail.com', // Seu e-mail
            to,
            subject,
            html: `
                <p>Olá, você foi convidado para um evento!</p>
                <p>Por favor, confirme sua presença escaneando o QR Code em anexo ou clicando o link abaixo:</p>
                 <p><a href="${qrCodeData}">Confirmar Presença</a></p>
            `,
            attachments: [
                {
                    filename: 'qrcode.png',
                    content: qrCodeImage.split('base64,')[1], // Converte base64 para buffer
                    encoding: 'base64'
                }
            ]
        };

        // Enviar e-mail
        await transporter.sendMail(mailOptions);
        console.log('E-mail enviado com sucesso para:', to);
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
    }
};