import axios from 'axios';
import React, { useState } from 'react';
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
                localStorage.setItem('userId', response.data.user.id);
                console.log('Connexion réussie:', response.data);
                navigate('/');
            })
            .catch(error => {
                setError(error.response?.data?.message || 'Une erreur est survenue lors de la connexion.');
                console.error('Erreur lors de la connexion:', error.response?.data || error.message);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] bg-white text-black">
            <div className="w-full max-w-md md:w-2/5 p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <button type="submit" className="btn w-full">Se connecter</button>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                </form>
                <p className="mt-4 text-center">
                    Pas encore de compte? <a href="/register" className="text-blue-500">S'inscrire</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
