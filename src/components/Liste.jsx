import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'; // Updated imports

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const Liste = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:8000/api/transactions', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    const sortedTransactions = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
                    setTransactions(sortedTransactions);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des transactions:', error);
                });
        }
    }, []);

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:8000/api/transactions/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                setTransactions(transactions.filter(transaction => transaction.id !== id));
                console.log('Transaction supprimée avec succès:', response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la suppression de la transaction:', error);
            });
    };

    const calculateTotals = () => {
        return transactions.reduce(
            (totals, transaction) => {
                totals.deposit += parseFloat(transaction.deposit) || 0;
                totals.expense += parseFloat(transaction.expense) || 0;
                return totals;
            },
            { deposit: 0, expense: 0 }
        );
    };

    const { deposit, expense } = calculateTotals();
    const netTotal = deposit - expense;

    return (
        <div className="p-6 bg-white text-black">
            <h1 className="text-center text-2xl font-bold uppercase mb-4 border-b-2 border-black pb-2">Liste des Transactions</h1>
            <div className="overflow-x-auto w-3/4 mx-auto bg-off-white p-6 rounded-lg shadow-md">
                <table className="table w-full border border-black rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-black">
                            <th className="border-b border-black py-2 text-left">Nom</th>
                            <th className="border-b border-black py-2 text-left">Date</th>
                            <th className="border-b border-black py-2 text-right text-green-500">Revenus</th>
                            <th className="border-b border-black py-2 text-right text-red-500">Dépenses</th>
                            <th className="border-b border-black py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className="border-b border-black">
                                <td className="py-2 text-left">{transaction.name}</td>
                                <td className="py-2 text-left">{formatDate(transaction.date)}</td>
                                <td className="py-2 text-right text-green-500">{transaction.deposit} €</td>
                                <td className="py-2 text-right text-red-500">{transaction.expense} €</td>
                                <td className="py-2 text-center">
                                    <Link to={`/edit-transaction/${transaction.id}`}>
                                        <PencilSquareIcon className="h-6 w-6 text-blue-500 inline-block mr-2 cursor-pointer" />
                                    </Link>
                                    <TrashIcon
                                        className="h-6 w-6 text-red-500 inline-block cursor-pointer"
                                        onClick={() => handleDelete(transaction.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="bg-gray-200 text-black">
                            <td colSpan="3" className="py-2 font-bold text-right">Total</td>
                            <td className="py-2 text-blue-500 font-bold text-right">{netTotal} €</td>
                            <td className="py-2" />
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default Liste;
