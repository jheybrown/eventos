import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import HomePage from './pages/HomePage';
import CreateEventPage from './pages/CreateEventPage';
import ManageEventsPage from './pages/ManageEventsPage';
import ConfirmPresencePage from './pages/ConfirmPresencePage';
import RegisterGuestPage from './pages/RegisterGuestPage';
import SendInvitePage from './pages/SendInvitePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './layouts/MainLayout';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? <MainLayout>{children}</MainLayout> : <Navigate to="/login" />;
};


function App() {
    return (
        <SnackbarProvider maxSnack={3}>
        <Router>
        
            <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PrivateRoute>
                                <HomePage />
                            </PrivateRoute>}/>
                <Route path="/create-event" element={<PrivateRoute><CreateEventPage /></PrivateRoute>} />
                <Route path="/manage-events" element={<ManageEventsPage />} />
                <Route path="/confirm/:eventId" element={<ConfirmPresencePage />} />
                <Route path="/register-guests" element={<RegisterGuestPage />} />
                <Route path="/send-invites" element={<SendInvitePage />} />
                <Route path="/register" element={<RegisterPage />} />
           
            </Routes>
        </Router>
        </SnackbarProvider>
    );
}

export default App;