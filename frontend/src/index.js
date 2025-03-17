import React from 'react';
import ReactDOM from 'react-dom/client'; // Importe de 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import theme from './theme';

// Crie uma raiz usando o método createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderize o aplicativo dentro da raiz
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>
);