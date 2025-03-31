import React, { useState } from 'react';
import styled from 'styled-components';

// --- Componente Principal --- //
const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem!');
    } else {
      alert(`Cadastro realizado para ${name} (${email})!`);
    }
  };

  return (
    <SignupContainer>
      <Header>TrocaLivros</Header>
      <SignupForm onSubmit={handleSignup}>
        <h2>Cadastro - TrocaLivros</h2>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Label htmlFor="name">Nome:</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <Label htmlFor="confirmPassword">Confirmar Senha:</Label>
        <Input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit">Cadastrar</Button>
      </SignupForm>
    </SignupContainer>
  );
};

// --- Estilos (no final do arquivo) --- //
const SignupContainer = styled.div`
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

const SignupForm = styled.form`
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

export default SignupPage;