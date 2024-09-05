import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import './style/App.css'
import Footer from './components/Footer.jsx';
import Home from './views/Home.jsx';
import Login from './views/login.jsx';
import Register from './views/Register.jsx';

const AppRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/register');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
      <Footer />
    </Router>
  );
}

export default App;
