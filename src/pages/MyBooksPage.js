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
  background: #f8f8f8;
  border-radius: 8px;
  width: 200px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BookTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.3rem;
  text-align: center;
`;

const BookAuthor = styled.div`
  font-size: 0.95em;
  color: #555;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.3rem 0.7rem;
  margin-top: 0.5rem;
  cursor: pointer;
`;

const MyBooksPage = () => {
  const [offered, setOffered] = useState([]);
  const [wanted, setWanted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

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
      setMsg('Erro ao buscar seus livros.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const removeOffered = async (internalId) => {
    setMsg('');
    try {
      await api.delete(`/api/books/offered/${internalId}`);
      setMsg('Livro removido da lista de possuídos.');
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
      setMsg('Erro ao remover livro.');
    }
  };

  const removeWanted = async (internalId) => {
    setMsg('');
    try {
      await api.delete(`/api/books/wanted/${internalId}`);
      setMsg('Livro removido da lista de desejados.');
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
      setMsg('Erro ao remover livro.');
    }
  };

  return (
    <Container>
      <h2>Meus Livros</h2>
      {msg && <div style={{ color: 'green', marginBottom: '1rem' }}>{msg}</div>}
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
                  'Livro';
                const authors =
                  book.authors ||
                  item?.google_id?.book?.authors ||
                  item?.title?.book?.authors ||
                  '';
                return (
                  <BookCard key={idx}>
                    <BookTitle>{title}</BookTitle>
                    {authors && <BookAuthor>{authors}</BookAuthor>}
                    <RemoveButton
                      onClick={() => removeOffered(internalId)}
                      disabled={!internalId}
                    >
                      Remover
                    </RemoveButton>
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
                  '';
                return (
                  <BookCard key={idx}>
                    <BookTitle>{title}</BookTitle>
                    {authors && <BookAuthor>{authors}</BookAuthor>}
                    <RemoveButton
                      onClick={() => removeWanted(internalId)}
                      disabled={!internalId}
                    >
                      Remover
                    </RemoveButton>
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