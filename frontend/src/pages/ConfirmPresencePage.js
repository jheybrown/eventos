import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const ConfirmPresencePage = () => {
    const { eventId } = useParams();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook para redirecionamento
    const { enqueueSnackbar } = useSnackbar(); // Hook para notificações

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/guests/confirm/${eventId}`, { email });
            setMessage(response.data.message);
            enqueueSnackbar('Presença confirmada com sucesso!', { variant: 'success' });
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error(error);
            setMessage('Erro ao confirmar presença');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Confirmar Presença
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Confirmar Presença
                </Button>
            </form>
            {message && (
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    {message}
                </Typography>
            )}
        </Container>
    );
};

export default ConfirmPresencePage;