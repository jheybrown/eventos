import React, { useEffect, useState } from 'react';
import {
     Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import MainLayout from '../layouts/MainLayout';

const RegisterGuestPage = () => {
    const [guests, setGuests] = useState([]);
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        email: '',
        event_id: ''
    });
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetchGuests();
        fetchEvents();
    }, []);

    const fetchGuests = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/guests');
            setGuests(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/events');
            setEvents(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (isEditing) {
                response = await axios.put(`http://localhost:5000/api/guests/${formData.id}`, formData);
                console.log('Resposta da edição:', response.data);
                enqueueSnackbar('Convidado atualizado com sucesso!', { variant: 'success' });
            } else {
                response = await axios.post('http://localhost:5000/api/guests', formData);
                console.log('Resposta da adição:', response.data);
                enqueueSnackbar('Convidado adicionado com sucesso!', { variant: 'success' });
            }
            fetchGuests();
            resetForm();
        } catch (error) {
            console.error('Erro ao salvar convidado:', error.response ? error.response.data : error.message);
            enqueueSnackbar('Erro ao salvar convidado', { variant: 'error' });
        }
    };

    const handleEdit = (guest) => {
        setFormData(guest);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/guests/${id}`);
            console.log('Resposta da exclusão:', response.data);
            fetchGuests();
            enqueueSnackbar('Convidado excluído com sucesso!', { variant: 'success' });
        } catch (error) {
            console.error('Erro ao excluir convidado:', error.response ? error.response.data : error.message);
            enqueueSnackbar('Erro ao excluir convidado', { variant: 'error' });
        }
    };

    const resetForm = () => {
        setFormData({
            id: null,
            name: '',
            email: '',
            event_id: ''
        });
        setIsEditing(false);
        setShowForm(false);
    };

    return (
        <MainLayout>
       
            <Typography variant="h4" gutterBottom>
                Registrar Convidados
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={() => setShowForm(!showForm)}
                sx={{ marginTop: 2 }}
            >
                {showForm ? 'Ocultar Formulário' : 'Adicionar Convidado'}
            </Button>

            {showForm && (
                <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                    <TextField
                        label="Nome do Convidado"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required={true}
                    />
                    <TextField
                        label="Email do Convidado"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required={true}
                    />
                     <TextField
                        label="Telefone(Whatsapp)"
                        name="cellphone"
                        value={formData.cellphone}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required={true}
                    />
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Evento</InputLabel>
                        <Select
                            name="event_id"
                            value={formData.event_id}
                            onChange={handleInputChange}
                            label="Evento"
                        >
                            {events.map((event) => (
                                <MenuItem key={event.id} value={event.id}>
                                    {event.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                        {isEditing ? 'Atualizar Convidado' : 'Adicionar Convidado'}
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ marginTop: 2, marginLeft: 2 }}
                        onClick={resetForm}
                    >
                        Cancelar
                    </Button>
                </form>
            )}

            <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Evento</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Confirmado</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {guests.map((guest) => (
                            <TableRow key={guest.id}>
                                <TableCell>{guest.name}</TableCell>
                                <TableCell>{guest.email}</TableCell>
                                <TableCell>
                                    {events.find((event) => event.id === guest.event_id)?.name || 'Evento não encontrado'}
                                </TableCell>
                                <TableCell>
                                    {guest.confirmed ? 'Sim' : 'Não'}
                                </TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleEdit(guest)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(guest.id)}>
                                        <DeleteIcon />
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

export default RegisterGuestPage;