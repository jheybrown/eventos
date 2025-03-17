import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton, Box
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import MainLayout from '../layouts/MainLayout';

const SendInvitePage = () => {
    const [guests, setGuests] = useState([]); // Lista de convidados
    const { enqueueSnackbar } = useSnackbar();

    // Buscar convidados ao carregar a página
    useEffect(() => {
        fetchGuests();
    }, []);

    // Função para buscar convidados
    const fetchGuests = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/guests');
            setGuests(response.data);
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Erro ao buscar convidados', { variant: 'error' });
        }
    };

    // Função para enviar convite via WhatsApp
    const sendWhatsAppInvite = (phone, eventName, confirmationLink) => {
        const message = `Olá! Você está convidado para o evento ${eventName}. Por favor, confirme sua presença clicando no link: ${confirmationLink}`;
        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <MainLayout>
    
          
            <Box sx={{ backgroundColor: "#f5f5f5", p: 2, borderRadius: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
      Enviar Convites via WhatsApp
      </Typography>
    </Box>

            {/* Tabela de convidados */}
            <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Telefone</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Evento</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {guests.map((guest) => (
                            <TableRow key={guest.id}>
                                <TableCell>{guest.name}</TableCell>
                                <TableCell>{guest.email}</TableCell>
                                <TableCell>{guest.cellphone}</TableCell>
                                <TableCell>{guest.event_id}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => {
                                            const confirmationLink = `http://localhost:3000/confirm-presence/${guest.event_id}?email=${guest.email}`;
                                            sendWhatsAppInvite(guest.cellphone, guest.event_id, confirmationLink);
                                        }}
                                    >
                                        <WhatsAppIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
     
        </MainLayout>
    );
};

export default SendInvitePage;