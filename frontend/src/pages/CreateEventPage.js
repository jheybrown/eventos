import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const CreateEventPage = () => {
    const [event, setEvent] = useState({
        name: '',
        description: '',
        date: '',
        location: '',
        image: '',
        total_guests: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/events', event);
            alert('Evento criado com sucesso!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Criar Evento
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nome do Evento"
                    fullWidth
                    margin="normal"
                    value={event.name}
                    onChange={(e) => setEvent({ ...event, name: e.target.value })}
                />
                <TextField
                    label="Descrição"
                    fullWidth
                    margin="normal"
                    value={event.description}
                    onChange={(e) => setEvent({ ...event, description: e.target.value })}
                />
                <TextField
                    label="Data"
                    type="datetime-local"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={event.date}
                    onChange={(e) => setEvent({ ...event, date: e.target.value })}
                />
                <TextField
                    label="Local"
                    fullWidth
                    margin="normal"
                    value={event.location}
                    onChange={(e) => setEvent({ ...event, location: e.target.value })}
                />
                <TextField
                    label="URL da Imagem"
                    fullWidth
                    margin="normal"
                    value={event.image}
                    onChange={(e) => setEvent({ ...event, image: e.target.value })}
                />
                <TextField
                    label="Total de Convidados"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={event.total_guests}
                    onChange={(e) => setEvent({ ...event, total_guests: e.target.value })}
                />
                <Button type="submit" variant="contained" color="primary">
                    Criar Evento
                </Button>
            </form>
        </Container>
    );
};

export default CreateEventPage;