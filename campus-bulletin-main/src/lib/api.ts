import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
});

export default api;
export const fetchCirculars = () => api.get('/circulars');
export const createCircular = (data) => api.post('/circulars', data);
export const addComment = (id, content) => api.post(`/circulars/${id}/comments`, { content });
export const loginUser = (email, password) => api.post('/auth/login', { email, password });
export const registerUser = (userData) => api.post('/auth/register', userData);
