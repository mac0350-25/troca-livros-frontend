import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:50001', 
    headers: {
      'Content-Type': 'application/json',
    },
});
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // <-- FIXED
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const handleLogin = (result, navigate) => {
  if (result.success) {
    localStorage.setItem('token', result.token);
    localStorage.setItem('user', JSON.stringify(result.user));
    //console.log('Redirecting to /user with user:', result.user); // Add this
    navigate('/user');
  }
};

export default api;