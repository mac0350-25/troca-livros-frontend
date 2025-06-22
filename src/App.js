import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import MyBooksPage from './pages/MyBooksPage';
import TradesPage from './pages/TradesPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/mybooks" element={<MyBooksPage />} />
        <Route path="/trades" element={<TradesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
