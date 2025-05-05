import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
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
  right: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  background-color: #007bff;
  color: white;
`;

const UserName = styled.div`
  font-weight: bold;
  margin-right: 2rem;
`;

const LogoutButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
  &:hover {
    background: #b52a37;
  }
`;

const Welcome = styled.h1`
  color: #333;
`;

const UserPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let user = null;
  try {
    const userStr = localStorage.getItem('user');
    user = userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // If user is not found, redirect to login
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <Container>
      <Header>
        <UserName>{user?.name}</UserName>
        <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
      </Header>
      <Welcome>Bem-vindo, {user?.name}!</Welcome>
    </Container>
  );
};

export default UserPage;