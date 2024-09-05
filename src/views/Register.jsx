import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/register', {
            name,
            email,
            password
        })
            .then(response => {
                console.log('Inscription réussie:', response.data);
                navigate('/login'); // Redirection vers la page de connexion après l'inscription
            })
            .catch(error => {
                setError(error.response?.data?.message || 'Une erreur est survenue lors de l\'inscription.');
                console.error('Erreur lors de l\'inscription:', error.response?.data || error.message);
            });
    };

    return (
        <div>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <label className="input input-bordered flex items-center gap-2">
                    <input 
                        type="text" 
                        className="grow" 
                        placeholder="Nom" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </label>
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
                <button type="submit" className="btn">S'inscrire</button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
            <p className="mt-4">
                Déjà un compte? <a href="/login" className="text-blue-500">Se connecter</a>
            </p>
        </div>
    );
};

export default Register;
