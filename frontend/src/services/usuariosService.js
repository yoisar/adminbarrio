import axios from 'axios';

export const fetchUsuarios = async () => {
    const response = await axios.get('/api/users');
    return response.data;
};