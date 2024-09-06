import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditTransaction = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [deposit, setDeposit] = useState('');
    const [expense, setExpense] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (id) {
            axios.get(`http://localhost:8000/api/transactions/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    const transaction = response.data;
                    console.log('Transaction récupérée:', transaction);
                    setName(transaction.name || '');
                    setDate(transaction.date || '');
                    setDeposit(transaction.deposit || '');
                    setExpense(transaction.expense || '');
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération de la transaction:', error);
                    setError('Erreur lors de la récupération des données.');
                });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');
    
        const depositValue = deposit ? parseFloat(deposit) : 0;
        const expenseValue = expense ? parseFloat(expense) : 0;
    
        axios.put(`http://localhost:8000/api/transactions/${id}`, {
            name,
            date,
            deposit: depositValue,
            expense: expenseValue,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log('Transaction mise à jour avec succès:', response.data);
                navigate('/');
            })
            .catch(error => {
                setError(error.response?.data?.message || 'Une erreur est survenue lors de la mise à jour de la transaction.');
                console.error('Erreur lors de la mise à jour de la transaction:', error.response?.data || error.message);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-200 shadow-md rounded-md mx-auto mt-10 max-w-lg">
            <h1 className="text-center text-2xl text-black font-bold uppercase mb-4">Modifier la Transaction</h1>
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
            <button type="submit" className="btn bg-black text-white hover:bg-gray-800 w-full">Mettre à jour la transaction</button>
        </form>
    );
};

export default EditTransaction;
