import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/login', { email, password })
            .then(response => {
                console.log('Login successful:', response.data);

                const { token } = response.data;
                localStorage.setItem('token', token);

                navigate('/');
            })
            .catch(error => {
                setError(error.response?.data?.message || 'An error occurred while logging in.');
                console.error('Error logging in:', error.response?.data || error.message);
            });
    };

    return (
        <div className="container-register">
            <div className="form-register">
                <form onSubmit={handleLogin}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <h1 className='title-register'>Connexion</h1>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="input input-bordered w-full bg-inherit"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="input input-bordered w-full bg-inherit"
                    />
                    <button type="submit" className="btnForm mt-10 btn-register">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
