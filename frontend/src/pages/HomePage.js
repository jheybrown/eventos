import React, { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent, Box, Container } from '@mui/material';
import { useNavigate } from "react-router-dom";
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getStats } from '../services/statsService';
import MainLayout from '../layouts/MainLayout';


const HomePage = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalEvents: 0,
        totalGuests: 0,
        totalConfirmed: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getStats();
                setStats(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStats();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/");
      }, [navigate]);


      const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
      };

    return (
        
       <Container maxWidth="lg">
       <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Bem-vindo ao Gestão de Eventos
            </Typography>
            <Typography variant="body1" gutterBottom>
                Gerencie seus eventos de casamento e reuniões corporativas de forma fácil e eficiente.
            </Typography>

            {/* Cards de Estatísticas */}
            <Grid container spacing={3} sx={{ marginTop: 4 }}>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ backgroundColor: '#f5f5f5' }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={1}>
                                <EventIcon color="primary" />
                                <Typography variant="h6" component="div">
                                    Total de Eventos
                                </Typography>
                            </Box>
                            <Typography variant="h4" color="primary" sx={{ marginTop: 2 }}>
                                {stats.totalEvents}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ backgroundColor: '#f5f5f5' }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={1}>
                                <PeopleIcon color="secondary" />
                                <Typography variant="h6" component="div">
                                    Total de Convidados
                                </Typography>
                            </Box>
                            <Typography variant="h4" color="secondary" sx={{ marginTop: 2 }}>
                                {stats.totalGuests}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ backgroundColor: '#f5f5f5' }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={1}>
                                <CheckCircleIcon color="success" />
                                <Typography variant="h6" component="div">
                                    Total de Confirmações
                                </Typography>
                            </Box>
                            <Typography variant="h4" color="success.main" sx={{ marginTop: 2 }}>
                                {stats.totalConfirmed}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
           </Box>
           </Container>
           
          
    );
};

export default HomePage;