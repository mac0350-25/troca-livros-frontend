import api from './index';

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      console.log('Full API Response structure:', JSON.stringify(response.data, null, 2));
      console.log('API Response:', response.data); // Debug log
      
      const { data } = response.data; 
      
      return {
        success: true,
        token: data.access_token,
        user: {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          created_at: data.user.created_at,
          updated_at: data.user.updated_at
        }
      };
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Credenciais inválidas'
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
        error: error.response?.data?.error?.message || 'Erro no cadastro'
      };
    }
  }
};