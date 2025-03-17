import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';

const ManageEventsPage = () => {
    const [events, setEvents] = useState([]); // Lista de eventos
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        description: '',
        date: '',
        location: '',
        image: '',
        total_guests: ''
    });
    const [isEditing, setIsEditing] = useState(false); // Modo de edição
    const [showForm, setShowForm] = useState(false); // Visibilidade do formulário

    // Buscar eventos ao carregar a página
    useEffect(() => {
        fetchEvents();
    }, []);

    // Função para buscar eventos
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/events');
            setEvents(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Função para lidar com mudanças no formulário
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Função para salvar ou atualizar um evento
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                // Atualizar evento existente
                await axios.put(`http://localhost:5000/api/events/${formData.id}`, formData);
            } else {
                // Criar novo evento
                await axios.post('http://localhost:5000/api/events', formData);
            }
            fetchEvents(); // Atualizar lista de eventos
            resetForm(); // Limpar formulário e ocultá-lo
        } catch (error) {
            console.error(error);
        }
    };

    // Função para editar um evento
    const handleEdit = (event) => {
        setFormData(event);
        setIsEditing(true);
        setShowForm(true); // Exibe o formulário
    };

    // Função para apagar um evento
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/events/${id}`);
            fetchEvents(); // Atualizar lista de eventos
        } catch (error) {
            console.error(error);
        }
    };

    // Função para limpar o formulário e ocultá-lo
    const resetForm = () => {
        setFormData({
            id: null,
            name: '',
            description: '',
            date: '',
            location: '',
            image: '',
            total_guests: ''
        });
        setIsEditing(false);
        setShowForm(false); // Oculta o formulário
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Gerenciar Eventos
            </Typography>

            {/* Botão para mostrar/ocultar o formulário */}
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    resetForm(); // Limpa o formulário
                    setShowForm(!showForm); // Alterna a visibilidade do formulário
                }}
                sx={{ marginTop: 2 }}
            >
                {showForm ? 'Ocultar Formulário' : 'Adicionar Evento'}
            </Button>

            {/* Formulário para adicionar/editar eventos */}
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nome do Evento"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Descrição"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                    />
                    <TextField
                        label="Data e Hora"
                        name="date"
                        type="datetime-local"
                        value={formData.date}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <TextField
                        label="Local"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="URL da Imagem"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Total de Convidados"
                        name="total_guests"
                        type="number"
                        value={formData.total_guests}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                        {isEditing ? 'Atualizar Evento' : 'Adicionar Evento'}
                    </Button>
                    {isEditing && (
                        <Button variant="outlined" color="secondary" sx={{ marginTop: 2, marginLeft: 2 }} onClick={resetForm}>
                            Cancelar Edição
                        </Button>
                    )}
                </form>
            )}

            {/* Tabela de eventos */}
            <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Local</TableCell>
                            <TableCell>Total Convidados</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((event) => (
                            <TableRow key={event.id}>
                                <TableCell>{event.name}</TableCell>
                                <TableCell>{event.description}</TableCell>
                                <TableCell>{new Date(event.date).toLocaleString()}</TableCell>
                                <TableCell>{event.location}</TableCell>
                                <TableCell>{event.total_guests}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleEdit(event)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(event.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ManageEventsPage;