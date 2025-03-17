import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Sidebar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remover token
        navigate('/login'); // Redirecionar para a página de login
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 0,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 260,
                    boxSizing: 'border-box',
                    backgroundColor: '#424242', // Cinza escuro
                    color: '#ffffff', // Fonte branca
                    marginTop: '64px', // Ajuste para a altura do NavBar
                },
            }}
        >
            <List>
                
                <ListItem button component={Link} to="/" sx={{ color: 'inherit' }}>
                    <ListItemIcon sx={{ color: 'inherit' }}>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component={Link} to="/manage-events" sx={{ color: 'inherit' }}>
                    <ListItemIcon sx={{ color: 'inherit' }}>
                        <EventIcon />
                    </ListItemIcon>
                    <ListItemText primary="Gerenciar Eventos" />
                </ListItem>
                <ListItem button component={Link} to="/register-guests" sx={{ color: 'inherit' }}>
                    <ListItemIcon sx={{ color: 'inherit' }}>
                        <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Registrar Convidados" />
                </ListItem>
                <ListItem button component={Link} to="/send-invites" sx={{ color: 'inherit' }}>
                        <ListItemIcon sx={{ color: 'inherit' }}>
                            <WhatsAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Convidar Whatsapp" />
                    </ListItem>
                <Divider sx={{ backgroundColor: '#616161' }} /> {/* Cor do divisor */}
                
                   
                    <ListItem button component={Link} to="/register" sx={{ color: 'inherit' }}>
                    <ListItemIcon sx={{ color: 'inherit' }}>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Registrar Usuários" />
                </ListItem>
                
            </List>
            <Divider sx={{ backgroundColor: '#616161' }} /> {/* Cor do divisor */}
            {token && (
                <List>
                    <ListItem button onClick={handleLogout} sx={{ color: 'inherit' }}>
                        <ListItemIcon sx={{ color: 'inherit' }}>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sair" />
                    </ListItem>
                </List>
            )}
        </Drawer>
    );
};

export default Sidebar;