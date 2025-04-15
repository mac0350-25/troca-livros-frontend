import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:50001/api', // URL do seu backend Rust
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token JWT (quando implementar autenticação)
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;