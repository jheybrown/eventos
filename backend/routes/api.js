const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const guestController = require('../controllers/guestController');
const db = require('../config/db'); // Importe o módulo db
const emailService = require('../services/emailService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware'); 
// Rotas para Eventos
router.post('/events', eventController.createEvent);
router.get('/events/:id', eventController.getEventById);
router.put('/events/:id', eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

// Rotas para Convidados
router.post('/events/:id/invite', guestController.sendInvite);
router.post('/events/:id/confirm', guestController.confirmPresence);



router.get('/stats', async (req, res) => {
    try {
        // Total de eventos
        const [events] = await db.query('SELECT COUNT(*) as totalEvents FROM events');
        // Total de convidados
        const [guests] = await db.query('SELECT COUNT(*) as totalGuests FROM guests');
        // Total de confirmações
        const [confirmed] = await db.query('SELECT COUNT(*) as totalConfirmed FROM guests WHERE confirmed = TRUE');

        res.json({
            totalEvents: events[0].totalEvents,
            totalGuests: guests[0].totalGuests,
            totalConfirmed: confirmed[0].totalConfirmed,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar estatísticas' });
    }
});

router.get('/guests', async (req, res) => {
    try {
        const [guests] = await db.query('SELECT * FROM guests');
        res.json(guests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar convidados' });
    }
});

router.post('/guests', async (req, res) => {
    const { name, email, event_id, cellphone } = req.body;

    try {
        // Buscar o nome do evento
        const [event] = await db.query('SELECT name FROM events WHERE id = ?', [event_id]);
        if (!event.length) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }
        const eventName = event[0].name;

        // Inserir o convidado no banco de dados
        const [result] = await db.query(
            'INSERT INTO guests (name, email, event_id, cellphone) VALUES (?, ?, ?, ?)',
            [name, email, event_id, cellphone]
        );

        // Enviar e-mail com QR Code
        await emailService.sendEmailWithQRCode(email, `Confirmação de Presença - ${eventName}`, event_id);

        res.status(201).json({ message: 'Convidado adicionado e e-mail enviado', guestId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao adicionar convidado' });
    }
});

router.put('/guests/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, event_id } = req.body;
    try {
        await db.query(
            'UPDATE guests SET name = ?, email = ?, event_id = ? WHERE id = ?',
            [name, email, event_id, id]
        );
        res.status(200).json({ message: 'Convidado atualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar convidado' });
    }
});


router.post('/guests/confirm/:eventId', async (req, res) => {
    const { eventId } = req.params;
    const { email } = req.body;

    try {
        // Atualizar o status de confirmação do convidado
        await db.query('UPDATE guests SET confirmed = TRUE WHERE event_id = ? AND email = ?', [eventId, email]);
        res.status(200).json({ message: 'Presença confirmada com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao confirmar presença' });
    }
});


router.delete('/guests/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM guests WHERE id = ?', [id]);
        res.status(200).json({ message: 'Convidado excluído' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir convidado' });
    }
});

router.get('/events', async (req, res) => {
    try {
        const [events] = await db.query(`
            SELECT 
                events.*, 
                COUNT(guests.id) AS total_guest,
                SUM(guests.confirmed) AS total_confirmed
            FROM events
            LEFT JOIN guests ON events.id = guests.event_id
            GROUP BY events.id
        `);
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar eventos' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verificar se o usuário existe
        const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (user.length === 0) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        // Verificar a senha
        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        // Gerar token JWT
        const token = jwt.sign({ id: user[0].id }, 'seuSegredoJWT', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao fazer login' });
        console.log('Dados recebidos:', req.body);
    }
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verificar se o usuário já existe
        const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (user.length > 0) {
            return res.status(400).json({ message: 'Usuário já existe.' });
        }

        // Criptografar a senha
        const salt = await bcrypt.genSalt(10); // Gerar um salt
        const hashedPassword = await bcrypt.hash(password, salt); // Criptografar a senha

        // Inserir o novo usuário no banco de dados
        await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
});

module.exports = router;