import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getStats = async () => {
    try {
        const response = await axios.get(`${API_URL}/stats`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};