import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../api/index';

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const BookList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const BookCard = styled.div`
  background: white;
  border-radius: 8px;
  width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const BookImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const BookInfo = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const BookTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1rem;
  text-align: center;
`;

const BookAuthor = styled.p`
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 0.9rem;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-top: auto;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background: #c82333;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
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

const MyBooksPage = () => {
  const [offered, setOffered] = useState([]);
  const [wanted, setWanted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 4000);
  };

  const fetchBookInfo = async (id) => {
    try {
      const res = await api.post('/api/books/search', { query: id });
      if (Array.isArray(res.data) && res.data.length > 0) {
        return { ...res.data[0], google_id: id };
      }
      if (res.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
        return { ...res.data.data[0], google_id: id };
      }
      return { google_id: id, title: id };
    } catch {
      return { google_id: id, title: id };
    }
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/books');
      const data = res.data?.data || {};
      const offeredDetails = await Promise.all(
        (data.offered_books || []).map(fetchBookInfo)
      );
      const wantedDetails = await Promise.all(
        (data.wanted_books || []).map(fetchBookInfo)
      );
      setOffered(offeredDetails);
      setWanted(wantedDetails);
    } catch (e) {
      showToast('Erro ao buscar seus livros.', 'error');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const removeOffered = async (internalId) => {
    setActionLoading(true);
    try {
      await api.delete(`/api/books/offered/${internalId}`);
      showToast('Livro removido da lista de possuídos.', 'success');
      setOffered(offered.filter(item => {
        const id =
          item?.google_id?.id ||
          item?.title?.id ||
          item?.book?.id ||
          item?.id ||
          '';
        return id !== internalId;
      }));
    } catch {
      showToast('Erro ao remover livro.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const removeWanted = async (internalId) => {
    setActionLoading(true);
    try {
      await api.delete(`/api/books/wanted/${internalId}`);
      showToast('Livro removido da lista de desejados.', 'success');
      setWanted(wanted.filter(item => {
        const id =
          item?.google_id?.id ||
          item?.title?.id ||
          item?.book?.id ||
          item?.id ||
          '';
        return id !== internalId;
      }));
    } catch {
      showToast('Erro ao remover livro.', 'error');
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

      <h2>Meus Livros</h2>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <>
          <Section>
            <h3>Possuídos</h3>
            <BookList>
              {offered.length === 0 && <div>Nenhum livro oferecido.</div>}
              {offered.map((item, idx) => {
                const book =
                  item?.google_id?.book ||
                  item?.title?.book ||
                  item?.book ||
                  {};
                const internalId =
                  item?.google_id?.id ||
                  item?.title?.id ||
                  book.id ||
                  item?.id ||
                  '';
                const title =
                  book.title ||
                  item?.google_id?.book?.title ||
                  item?.title?.book?.title ||
                  item?.google_id ||
                  item?.title ||
                  item?.title ||
                  'Livro';
                const authors =
                  book.authors ||
                  item?.google_id?.book?.authors ||
                  item?.title?.book?.authors ||
                  item?.authors ||
                  '';
                const imageUrl = 
                  item?.image_url ||
                  book?.image_url ||
                  'https://via.placeholder.com/150';

                return (
                  <BookCard key={idx}>
                    <BookImage 
                      src={imageUrl} 
                      alt={title}
                    />
                    <BookInfo>
                      <BookTitle>{title}</BookTitle>
                      {authors && <BookAuthor>{authors}</BookAuthor>}
                      <RemoveButton
                        onClick={() => removeOffered(internalId)}
                        disabled={!internalId || actionLoading}
                      >
                        Remover
                      </RemoveButton>
                    </BookInfo>
                  </BookCard>
                );
              })}
            </BookList>
          </Section>
          <Section>
            <h3>Desejados</h3>
            <BookList>
              {wanted.length === 0 && <div>Nenhum livro desejado.</div>}
              {wanted.map((item, idx) => {
                const book =
                  item?.google_id?.book ||
                  item?.title?.book ||
                  item?.book ||
                  {};
                const internalId =
                  item?.google_id?.id ||
                  item?.title?.id ||
                  book.id ||
                  item?.id ||
                  '';
                const title =
                  book.title ||
                  item?.google_id?.book?.title ||
                  item?.title?.book?.title ||
                  item?.google_id ||
                  item?.title ||
                  'Livro';
                const authors =
                  book.authors ||
                  item?.google_id?.book?.authors ||
                  item?.title?.book?.authors ||
                  item?.authors ||
                  '';
                const imageUrl = 
                  item?.image_url ||
                  book?.image_url ||
                  'https://via.placeholder.com/150';

                return (
                  <BookCard key={idx}>
                    <BookImage 
                      src={imageUrl} 
                      alt={title}
                    />
                    <BookInfo>
                      <BookTitle>{title}</BookTitle>
                      {authors && <BookAuthor>{authors}</BookAuthor>}
                      <RemoveButton
                        onClick={() => removeWanted(internalId)}
                        disabled={!internalId || actionLoading}
                      >
                        Remover
                      </RemoveButton>
                    </BookInfo>
                  </BookCard>
                );
              })}
            </BookList>
          </Section>
        </>
      )}
    </Container>
  );
};

export default MyBooksPage;