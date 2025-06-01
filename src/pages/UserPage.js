import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../api/index';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #007bff;
  color: white;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  max-width: 600px;
  margin: 0 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #218838;
  }
`;

const LogoutButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
  &:hover {
    background: #b52a37;
  }
`;

const BooksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const BookCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const BookImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const BookInfo = styled.div`
  padding: 1rem;
`;

const BookTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
`;

const BookAuthor = styled.p`
  margin: 0 0 0.5rem 0;
  color: #666;
`;

const BookDescription = styled.p`
  margin: 0;
  color: #777;
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const UserPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/api/books/search', {
        query: searchQuery
      });
      if (Array.isArray(response.data)) {
        setBooks(response.data);
      } else if (response.data.data && Array.isArray(response.data.data)) {
        setBooks(response.data.data);
      } else {
        setError('Unexpected response format from server');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error searching books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAddOffered = async (google_id) => {
    setActionMessage('');
    try {
      const response = await api.post('/api/books/offered', { google_id });
      setActionMessage(response.data.message || 'Livro adicionado à lista de possuídos!');
    } catch (error) {
      setActionMessage(error.response?.data?.message || 'Erro ao adicionar livro à lista de possuídos.');
    }
  };

  const handleAddWanted = async (google_id) => {
    setActionMessage('');
    try {
      const response = await api.post('/api/books/wanted', { google_id });
      setActionMessage(response.data.message || 'Livro adicionado à lista de desejados!');
    } catch (error) {
      setActionMessage(error.response?.data?.message || 'Erro ao adicionar livro à lista de desejados.');
    }
  };

  return (
    <Container>
      <Header>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search for books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </SearchContainer>
        <div>
          <button
            style={{
              marginRight: '1rem',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0.5rem 1rem',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/mybooks')}
          >
            Meus Livros
          </button>
          <button
            style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0.5rem 1rem',
              cursor: 'pointer'
            }}
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </Header>

      {error && <div style={{ color: 'red', padding: '1rem' }}>{error}</div>}
      {actionMessage && <div style={{ color: 'green', padding: '1rem' }}>{actionMessage}</div>}
      
      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
      ) : (
        <BooksContainer>
          {Array.isArray(books) ? (
            books.map((book) => (
              <BookCard key={book.google_id}>
                <BookImage 
                  src={book.image_url || 'https://via.placeholder.com/150'} 
                  alt={book.title}
                />
                <BookInfo>
                  <BookTitle>{book.title}</BookTitle>
                  <BookAuthor>{book.authors}</BookAuthor>
                  <BookDescription>{book.description}</BookDescription>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button
                      style={{
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleAddOffered(book.google_id)}
                    >
                      Adicionar à lista de possuídos
                    </button>
                    <button
                      style={{
                        background: '#ffc107',
                        color: '#333',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleAddWanted(book.google_id)}
                    >
                      Adicionar à lista de desejados
                    </button>
                  </div>
                </BookInfo>
              </BookCard>
            ))
          ) : (
            <div>No books found</div>
          )}
        </BooksContainer>
      )}
    </Container>
  );
};

export default UserPage;