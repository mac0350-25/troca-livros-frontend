import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// ==================== ESTILOS ====================
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Header = styled.header`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  background-color: #007bff;
  color: white;
`;

const NavButton = styled(Link)`
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background-color: white;
  color: #007bff;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e6e6e6;
  }
`;

const WelcomeMessage = styled.h1`
  color: #333;
  text-align: center;
`;

// ==================== COMPONENTE ====================
const HomePage = () => {
  return (
    <HomeContainer>
      <Header>
        <NavButton to="/login">Login</NavButton>
        <NavButton to="/signup">Cadastro</NavButton>
        <NavButton to="/trades">Trocas de Livros</NavButton>
      </Header>
      <WelcomeMessage>Bem-vindo ao Troca Livros!</WelcomeMessage>
    </HomeContainer>
  );
};

export default HomePage;