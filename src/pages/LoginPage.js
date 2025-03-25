import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Importar Link para navegação
import styled from 'styled-components';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'usuario' && password === 'senha') {
      alert('Login bem-sucedido!');
    } else {
      setErrorMessage('Credenciais inválidas');
    }
  };

  return (
    <LoginContainer>
      <Header>TrocaLivros</Header> {/* Cabeçalho com nome do app */}
      <LoginForm onSubmit={handleLogin}>
        <h2>Login - TrocaLivros</h2>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Label htmlFor="username">Usuário:</Label>
        <Input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* Organizar o cabeçalho e o formulário em coluna */
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
