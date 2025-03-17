import React from 'react';
import { Card, CardContent, Typography, CardMedia, Button, Box } from '@mui/material';

const EventCard = ({ event }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: 2, borderRadius: 2, boxShadow: 3 }}>
            <CardMedia
                component="img"
                height="140"
                image={event.image || 'https://via.placeholder.com/345x140'} // Imagem padrão caso não haja uma
                alt={event.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {event.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
                    {event.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        📅 {new Date(event.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        📍 {event.location}
                    </Typography>
                </Box>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
                <Button size="small" color="primary">
                    Editar
                </Button>
                <Button size="small" color="error">
                    Excluir
                </Button>
            </Box>
        </Card>
    );
};

export default EventCard;