// src/App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CreateTransaction from './components/CreateTransaction';
import EditTransaction from './components/EditTransaction';
import Footer from './components/Footer';
import Graph from './components/Graph';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import './style/App.css';
import Home from './views/Home';
import Login from './views/login';
import Register from './views/Register';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/create-transaction"
                    element={
                        <ProtectedRoute>
                            <CreateTransaction />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/graph"
                    element={
                        <ProtectedRoute>
                            <Graph />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/edit-transaction/:id"
                    element={
                        <ProtectedRoute>
                            <EditTransaction />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
