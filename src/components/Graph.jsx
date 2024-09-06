import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Graph = () => {
    const [data, setData] = React.useState({ labels: [], datasets: [] });

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/transactions', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const transactions = response.data;
                const groupedData = transactions.reduce((acc, transaction) => {
                    acc.revenues += parseFloat(transaction.deposit) || 0;
                    acc.expenses += parseFloat(transaction.expense) || 0;
                    return acc;
                }, { revenues: 0, expenses: 0 });

                setData({
                    labels: ['', ''],
                    datasets: [
                        {
                            label: 'Revenus',
                            data: [groupedData.revenues],
                            backgroundColor: 'rgba(0, 128, 0, 0.6)',  // Couleur verte plus vive
                            borderColor: 'rgba(0, 128, 0, 1)',        // Couleur verte plus vive
                            borderWidth: 1,
                        },
                        {
                            label: 'Dépenses',
                            data: [groupedData.expenses],
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.raw} €`;
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    callback: function(value, index, values) {
                        return data.labels[index];
                    },
                    color: 'black',
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    color: 'black',
                },
            },
        },
    };

    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6">
            <div className="w-4/5 max-w-4xl">
                <h1 className="text-center text-2xl text-black font-bold uppercase mb-4">Graphique des Transactions</h1>
                <div className="bg-white shadow-md rounded-md border border-gray-200 p-4">
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default Graph;
