import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:5000/api/login', {
              username: username,
              password: password
          });
          localStorage.setItem('token', response.data.token); // Armazenar token no localStorage
          enqueueSnackbar('Login realizado com sucesso!', { variant: 'success' });
          navigate('/'); // Redirecionar para a página principal
      } catch (error) {
          console.error('Erro ao fazer login:', error.response ? error.response.data : error.message);
          enqueueSnackbar('Erro ao fazer login', { variant: 'error' });
          console.log('Dados enviados:', { username, password });
      }
  };

    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleLogin} style={{ width: '100%' }}>
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
                        Entrar
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default LoginPage;