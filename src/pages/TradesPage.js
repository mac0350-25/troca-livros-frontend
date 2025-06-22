import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../api';

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
`;

const TradeCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;

const BooksRow = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: flex-start;
`;

const BookInfo = styled.div`
  flex: 1;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

const BookImage = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  background: #eee;
`;

const BookDetails = styled.div`
  flex: 1;
`;

const PartnerInfo = styled.div`
  margin-top: 1rem;
  color: #555;
  font-size: 0.95rem;
`;

const TradesPage = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrades = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get('/api/trades/possible');
        setTrades(res.data || []);
      } catch (err) {
        setError('Erro ao buscar trocas possíveis.');
      }
      setLoading(false);
    };
    fetchTrades();
  }, []);

  return (
    <Container>
      <h2>Trocas Possíveis</h2>
      {loading && <div>Carregando...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && trades.length === 0 && <div>Nenhuma troca possível encontrada.</div>}
      {trades.map((trade, idx) => (
        <TradeCard key={idx}>
          <BooksRow>
            <BookInfo>
              <BookImage src={trade.offered_book.image_url || 'https://via.placeholder.com/100x150'} alt={trade.offered_book.title} />
              <BookDetails>
                <strong>Seu livro oferecido:</strong>
                <div>{trade.offered_book.title}</div>
                <div><em>{trade.offered_book.authors}</em></div>
                <div style={{ fontSize: '0.9em', color: '#888' }}>{trade.offered_book.description}</div>
              </BookDetails>
            </BookInfo>
            <span style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>⇄</span>
            <BookInfo>
              <BookImage src={trade.wanted_book.image_url || 'https://via.placeholder.com/100x150'} alt={trade.wanted_book.title} />
              <BookDetails>
                <strong>Livro desejado:</strong>
                <div>{trade.wanted_book.title}</div>
                <div><em>{trade.wanted_book.authors}</em></div>
                <div style={{ fontSize: '0.9em', color: '#888' }}>{trade.wanted_book.description}</div>
              </BookDetails>
            </BookInfo>
          </BooksRow>
          <PartnerInfo>
            <strong>Parceiro de troca:</strong> {trade.trade_partner.name} ({trade.trade_partner.email})
          </PartnerInfo>
        </TradeCard>
      ))}
    </Container>
  );
};

export default TradesPage;