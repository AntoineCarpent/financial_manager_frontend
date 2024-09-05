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
                navigate('/'); // Redirection après succès
            })
            .catch(error => {
                setError(error.response?.data?.message || 'Une erreur est survenue lors de la création de la transaction.');
                console.error('Erreur lors de la création de la transaction:', error.response?.data || error.message);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-md">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                    type="date"
                    className="input input-bordered w-full"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Revenus</label>
                <input
                    type="number"
                    className="input input-bordered w-full"
                    placeholder="Revenus"
                    value={deposit}
                    onChange={(e) => setDeposit(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Dépenses</label>
                <input
                    type="number"
                    className="input input-bordered w-full"
                    placeholder="Dépenses"
                    value={expense}
                    onChange={(e) => setExpense(e.target.value)}
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="btn btn-primary w-full">Créer la transaction</button>
        </form>
    );
};

export default CreateTransaction;
