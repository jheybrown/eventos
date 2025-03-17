const db = require('../config/db');
const qrcode = require('qrcode');
const emailService = require('../services/emailService');

exports.sendInvite = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    // Link de confirmação
    const confirmationLink = `http://yourapp.com/confirm/${id}`;

    // Gerar QR Code como buffer
    qrcode.toBuffer(confirmationLink, (err, qrCodeBuffer) => {
        if (err) throw err;

        // Salvar convidado no banco de dados
        const sql = 'INSERT INTO guests (name, email, event_id) VALUES (?, ?, ?)';
        db.query(sql, [name, email, id], (err) => {
            if (err) throw err;

            // Enviar e-mail com o QR Code anexo e link de confirmação
            emailService.sendEmail(email, 'Confirmação de Presença', qrCodeBuffer, confirmationLink);
            res.status(200).json({ message: 'Email enviado' });
        });
    });
};

exports.confirmPresence = (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    // Atualizar status de confirmação do convidado
    const sql = 'UPDATE guests SET confirmed = TRUE WHERE event_id = ? AND email = ?';
    db.query(sql, [id, email], (err) => {
        if (err) throw err;
        res.status(200).json({ message: 'Presence confirmed' });
    });
};