import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.0.12:9696',
    //baseURL: 'https://marknow-api.onrender.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('marknow_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});