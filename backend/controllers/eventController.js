const db = require('../config/db');

// Buscar todos os eventos
exports.getEvents = async (req, res) => {
    try {
        const [events] = await db.query('SELECT * FROM events');
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar eventos' });
    }
};

// Buscar um evento por ID
exports.getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
        res.status(200).json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar evento' });
    }
};

// Criar um evento
exports.createEvent = async (req, res) => {
    const { name, description, date, location, image, total_guests } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO events (name, description, date, location, image, total_guests) VALUES (?, ?, ?, ?, ?, ?)',
            [name, description, date, location, image, total_guests]
        );
        res.status(201).json({ message: 'Evento criado', eventId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar evento' });
    }
};

// Atualizar um evento
exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const { name, description, date, location, image, total_guests } = req.body;
    try {
        await db.query(
            'UPDATE events SET name = ?, description = ?, date = ?, location = ?, image = ?, total_guests = ? WHERE id = ?',
            [name, description, date, location, image, total_guests, id]
        );
        res.status(200).json({ message: 'Evento atualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar evento' });
    }
};

// Excluir um evento
exports.deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM events WHERE id = ?', [id]);
        res.status(200).json({ message: 'Evento excluído' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir evento' });
    }
};