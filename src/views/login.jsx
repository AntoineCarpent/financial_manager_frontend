import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/login', {
            email,
            password
        })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.user.id); // Assurez-vous que l'ID utilisateur est renvoyé
                console.log('Connexion réussie:', response.data);
                navigate('/'); // Redirection vers la page d'accueil après connexion
            })
            .catch(error => {
                setError(error.response?.data?.message || 'Une erreur est survenue lors de la connexion.');
                console.error('Erreur lors de la connexion:', error.response?.data || error.message);
            });
    };

    return (
        <div>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <label className="input input-bordered flex items-center gap-2">
                    <input 
                        type="email" 
                        className="grow" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <input 
                        type="password" 
                        className="grow" 
                        placeholder="Mot de passe" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </label>
                <button type="submit" className="btn">Se connecter</button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
            <p className="mt-4">
                Pas encore de compte? <a href="/register" className="text-blue-500">S'inscrire</a>
            </p>
        </div>
    );
};

export default Login;
