import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// --- Componente Principal --- //
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'teste@email.com' && password === 'senha123') {
      alert('Login bem-sucedido!');
    } else {
      setErrorMessage('Email ou senha inválidos');
    }
  };

  return (
    <LoginContainer>
      <Header>TrocaLivros</Header>
      <LoginForm onSubmit={handleLogin}>
        <h2>Login - TrocaLivros</h2>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Label htmlFor="password">Senha:</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Entrar</Button>
        <SignupLink>
          Não tem uma conta? <Link to="/signup">Cadastre-se aqui</Link>
        </SignupLink>
      </LoginForm>
    </LoginContainer>
  );
};

// --- Estilos (no final do arquivo) --- //
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Header = styled.h1`
  font-size: 2rem;
  color: #007bff;
  margin-bottom: 20px;
`;

const LoginForm = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
`;

const Label = styled.label`
  margin-bottom: 5px;
  display: block;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-bottom: 10px;
`;

const SignupLink = styled.div`
  text-align: center;
  margin-top: 15px;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default LoginPage;