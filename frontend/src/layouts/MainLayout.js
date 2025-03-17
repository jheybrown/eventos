import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';

const MainLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* NavBar no topo */}
            <NavBar />

            {/* Conteúdo principal com Sidebar e conteúdo da página */}
   
                {/* Sidebar à esquerda */}
                <Sidebar />

                {/* Conteúdo da página */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 10,
                        marginLeft: '200px', // Ajuste para o tamanho do Sidebar
                        width: `calc(100% - 240px)`, // Adiciona scroll se o conteúdo for muito grande
                    }}
                >
                    {children}
                </Box>
        
        </Box>
    );
};

export default MainLayout;