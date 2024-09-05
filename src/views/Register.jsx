import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Vérifier si l'utilisateur est déjà connecté
        const token = localStorage.getItem('token');
        if (token) {
            // Si un token est présent, rediriger vers la page de connexion
            navigate('/login');
        }
    }, [navigate]);

    const handleRegister = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/register', { name, email, password })
            .then(response => {
                console.log('Registration successful:', response.data);
                navigate('/login'); // Redirection vers la page de connexion après l'inscription
            })
            .catch(error => {
                setError(error.response?.data?.message || 'Une erreur est survenue lors de l\'inscription.');
                console.error('Error registering:', error.response?.data || error.message);
            });
    };

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">Inscription</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Nom</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nom complet"
                            required
                            className="input input-bordered w-full bg-inherit"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Adresse email"
                            required
                            className="input input-bordered w-full bg-inherit"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mot de passe"
                            required
                            className="input input-bordered w-full bg-inherit"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full mt-4">S'inscrire</button>
                </form>
                <div className="mt-4 text-center">
                    <p>Déjà un compte ? <a href="/login" className="btn btn-secondary">Se connecter</a></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
