import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import MainLayout from '../layouts/MainLayout';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/register', { username, password });
            enqueueSnackbar(response.data.message, { variant: 'success' });
            navigate('/login'); // Redirecionar para a página de login após o registro
        } catch (error) {
            console.error(error);
            enqueueSnackbar(error.response?.data?.message || 'Erro ao registrar usuário', { variant: 'error' });
        }
    };

    return (
        <MainLayout>
        <Container maxWidth="lg">
            <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Registrar Usuário
                </Typography>
                <form onSubmit={handleRegister} style={{ width: '100%' }}>
                    <TextField
                        label="Usuário"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                        Registrar
                    </Button>
                </form>
            </Box>
        </Container>
          </MainLayout>
    );
};

export default RegisterPage;