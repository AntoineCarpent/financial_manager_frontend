import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTransaction = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [deposit, setDeposit] = useState('');
    const [expense, setExpense] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        const depositValue = deposit ? parseFloat(deposit) : 0;
        const expenseValue = expense ? parseFloat(expense) : 0;

        axios.post('http://localhost:8000/api/transactions', {
            name,
            date,
            deposit: depositValue,
            expense: expenseValue,
            user_id: userId,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log('Transaction créée avec succès:', response.data);
                navigate('/');
            })
            .catch(error => {
                setError(error.response?.data?.message || 'Une erreur est survenue lors de la création de la transaction.');
                console.error('Erreur lors de la création de la transaction:', error.response?.data || error.message);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-200 shadow-md rounded-md mx-auto mt-10 max-w-lg">
            <div className="mb-4">
                <input
                    type="text"
                    className="input bg-black text-white placeholder-white border-none w-full"
                    placeholder="Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    type="date"
                    className="input bg-black text-white placeholder-white border-none w-full"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    type="number"
                    className="input bg-black text-white placeholder-white border-none w-full"
                    placeholder="Revenus"
                    value={deposit}
                    onChange={(e) => setDeposit(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <input
                    type="number"
                    className="input bg-black text-white placeholder-white border-none w-full"
                    placeholder="Dépenses"
                    value={expense}
                    onChange={(e) => setExpense(e.target.value)}
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="btn bg-black text-white hover:bg-gray-800 w-full">Créer la transaction</button>
        </form>
    );
};

export default CreateTransaction;
