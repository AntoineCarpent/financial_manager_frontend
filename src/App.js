import React from 'react';
import './style/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from "./components/Footer";
import Home from './views/Home';
import Login from './views/login';
import Register from './views/Register';
import CreateTransaction from './components/CreateTransaction';
import Graph from "./components/Graph";
import EditeTransaction from "./components/EditTransection";

function App() {
    return (
        <Router>
          <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create-transaction" element={<CreateTransaction />} />
                <Route path="/graph" element={<Graph />} />
                <Route path="/edit-transaction/:id" element={<EditeTransaction />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
