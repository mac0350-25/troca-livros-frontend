import React, { useState  } from 'react';
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
  display: flex;
  flex-direction: column;
  flex: 1; /* Ocupa o espaço restante */
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
  margin: 0 0 1rem 0;
  color: #777;
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1; /* Permite que a descrição ocupe o espaço disponível */
`;

const Toast = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${props => props.type === 'success' ? '#28a745' : '#dc3545'};
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transform: translateX(${props => props.show ? '0' : '400px'});
  transition: transform 0.3s ease-in-out;
  max-width: 400px;
  word-wrap: break-word;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const UserPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 4000);
  };

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
      setError(error.response?.data?.error?.message || 'Error searching books. Please try again.');
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
    setActionLoading(true);
    try {
      const response = await api.post('/api/books/offered', { google_id });
      showToast(response.data.message || 'Livro adicionado à lista de possuídos!', 'success');
    } catch (error) {
      showToast(error.response?.data?.error?.message || 'Erro ao adicionar livro à lista de possuídos.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddWanted = async (google_id) => {
    setActionLoading(true);
    try {
      const response = await api.post('/api/books/wanted', { google_id });
      showToast(response.data.message || 'Livro adicionado à lista de desejados!', 'success');
    } catch (error) {
      showToast(error.response?.data?.error?.message || 'Erro ao adicionar livro à lista de desejados.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <Container>
      {actionLoading && (
        <LoadingOverlay>
          <LoadingSpinner />
        </LoadingOverlay>
      )}
      
      <Toast show={toast.show} type={toast.type}>
        {toast.message}
      </Toast>

      <Header>
        <SearchContainer>
          <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%' }}>
            <SearchInput
              type="text"
              placeholder="Search for books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton type="submit">Search</SearchButton>
          </form>
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
              cursor: 'pointer',
              marginRight: '2rem'
            }}
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </Header>

      {error && <div style={{ color: 'red', padding: '1rem' }}>{error}</div>}
      
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
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        opacity: actionLoading ? 0.6 : 1,
                        pointerEvents: actionLoading ? 'none' : 'auto'
                      }}
                      onClick={() => handleAddOffered(book.google_id)}
                      disabled={actionLoading}
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
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        opacity: actionLoading ? 0.6 : 1,
                        pointerEvents: actionLoading ? 'none' : 'auto'
                      }}
                      onClick={() => handleAddWanted(book.google_id)}
                      disabled={actionLoading}
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