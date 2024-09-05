import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Liste = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/transactions')
            .then(response => {
                setTransactions(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données:', error);
            });
    }, []);

    return (
        <ul>
            {transactions.map((transaction, index) => (
                <li key={index}>{transaction}</li>
            ))}
        </ul>
    );
};

export default Liste;
