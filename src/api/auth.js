import api from './index';

export const authService = {
  async login(email, password) {
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      
      alert('Login realizado com sucesso!');
      
      return {
        success: true,
        token: data.access_token,
        user: data.user
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Credenciais inválidas'
      };
    }
  },

  async register(name, email, password) {
    try {
      const { data } = await api.post('/api/auth/register', { name, email, password });
      
      alert('Cadastro realizado com sucesso!');
      
      return {
        success: true,
        user: data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro no cadastro'
      };
    }
  }
};