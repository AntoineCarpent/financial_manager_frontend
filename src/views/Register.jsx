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
        <div className="flex items-center justify-center min-h-[70vh] bg-white text-black">
            <div className="w-full max-w-md md:w-2/5 p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Inscription</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="text"
                            className="grow bg-transparent text-white placeholder-white p-2 outline-none"
                            placeholder="Nom"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="email"
                            className="grow bg-transparent text-white placeholder-white p-2 outline-none"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="password"
                            className="grow bg-transparent text-white placeholder-white p-2 outline-none"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit" className="btn w-full">S'inscrire</button>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                </form>
                <p className="mt-4 text-center">
                    Déjà un compte? <a href="/login" className="text-blue-500">Se connecter</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
