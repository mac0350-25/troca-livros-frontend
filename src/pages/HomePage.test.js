import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';

test('renders HomePage with welcome message and buttons', () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );

  // Verifica se a mensagem de boas-vindas está presente
  expect(screen.getByText(/Bem-vindo ao Troca Livros!/i)).toBeInTheDocument();

  // Verifica se os botões de Login e Cadastro estão presentes
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.getByText(/Cadastro/i)).toBeInTheDocument();
});