import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../api/auth';
import { handleLogin } from '../api/index';

// ==================== ESTILOS ====================
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f0f0;
`;

const LoginForm = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const FormTitle = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  background-color: #f8d7da;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: #0056b3;
      text-decoration: underline;
    }
  }
`;

// ==================== COMPONENTE ====================
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('Attempting login with:', { email, password }); // Debug log
    
    try {
      const result = await authService.login(email, password);
      console.log('Login result:', result); // Debug log

      if (result.success && result.token && result.user) {
        console.log('Login successful, navigating...'); // Debug log
        handleLogin(result, navigate);
      } else {
        console.log('Login failed:', result); // Debug log
        setError(result.error || 'Failed to login. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={onSubmit}>
        <FormTitle>Login</FormTitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <FormGroup>
          <FormLabel>Email:</FormLabel>
          <FormInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="seu@email.com"
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel>Senha:</FormLabel>
          <FormInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Digite sua senha"
          />
        </FormGroup>
        
        <SubmitButton type="submit">Entrar</SubmitButton>
        
        <RegisterLink>
          Não tem uma conta? <Link to="/signup">Registre-se</Link>
        </RegisterLink>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginPage;
