import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate  } from 'react-router-dom';

const NavBar = () => {
  
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remover token
        navigate('/login'); // Redirecionar para a página de login
    };

    return (


        
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                    Gestão de Eventos
                </Typography>
               
                {token ? (
                    <>
              
               

              

                
               
                <Button color="inherit" onClick={handleLogout}>
                            Sair
                        </Button>
                </>
                ) : (
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;