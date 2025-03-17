import React, { useEffect, useState } from 'react';
import {
    Container,
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
    IconButton,
    TablePagination,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import MainLayout from '../layouts/MainLayout';

const ManageEventsPage = () => {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        description: '',
        date: '',
        location: '',
        image: '',
        total_guests: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    // Buscar eventos ao carregar a página
    useEffect(() => {
        fetchEvents();
    }, []);

    // Função para buscar eventos
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/events');
            console.log('Dados dos eventos:', response.data); // Log dos dados
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
                enqueueSnackbar('Evento atualizado com sucesso!', { variant: 'success' });
            } else {
                // Criar novo evento
                await axios.post('http://localhost:5000/api/events', formData);
                enqueueSnackbar('Evento adicionado com sucesso!', { variant: 'success' });
            }
            fetchEvents(); // Atualizar lista de eventos
            resetForm(); // Limpar formulário e ocultá-lo
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Erro ao salvar evento', { variant: 'error' });
        }
    };

    // Função para editar um evento
    const handleEdit = (event) => {
        setFormData(event);
        setIsEditing(true);
        setShowForm(true); // Exibe o formulário
    };

    // Função para abrir o modal de confirmação de exclusão
    const handleOpenDeleteModal = (eventId) => {
        setEventToDelete(eventId);
        setOpenDeleteModal(true);
    };

    // Função para fechar o modal de confirmação de exclusão
    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        setEventToDelete(null);
    };

    // Função para apagar um evento
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/events/${eventToDelete}`);
            fetchEvents(); // Atualizar lista de eventos
            handleCloseDeleteModal(); // Fechar o modal
            enqueueSnackbar('Evento excluído com sucesso!', { variant: 'success' });
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Erro ao excluir evento', { variant: 'error' });
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

    // Função para mudar de página
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Função para mudar o número de linhas por página
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <MainLayout>
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
            <TableContainer component={Paper} sx={{ marginTop: 4, boxShadow: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Descrição</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Data</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Local</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Total Alocados</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Total Registados</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Confirmados</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((event) => (
                                <TableRow
                                    key={event.id}
                                    sx={{
                                        '&:hover': { backgroundColor: '#fafafa' }, // Efeito hover
                                    }}
                                >
                                    <TableCell>{event.name}</TableCell>
                                    <TableCell>{event.description}</TableCell>
                                    <TableCell>{new Date(event.date).toLocaleString()}</TableCell>
                                    <TableCell>{event.location}</TableCell>
                                    <TableCell>{event.total_guests}</TableCell>
                                    <TableCell>{event.total_guest| 0}</TableCell> {/* Exibe 0 se for undefined */}
                                    <TableCell>{event.total_confirmed || 0}</TableCell> {/* Exibe 0 se for undefined */}
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleEdit(event)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleOpenDeleteModal(event.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                {/* Paginação */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={events.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            {/* Modal de Confirmação de Exclusão */}
            <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    <Typography>
                        Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteModal} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
            </MainLayout>
    );
};

export default ManageEventsPage;