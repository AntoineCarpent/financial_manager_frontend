import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <div className="navbar bg-[#f5f5f5] text-black border-b border-gray-300">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost p-0">
                    <img 
                        src="/images/Soldout-removebg-preview.png" 
                        alt="Logo Soldout" 
                        className="h-16 w-auto object-contain"
                    />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-black">
                    <li><Link to="/">Acceuil</Link></li>
                    <li><Link to="/create-transaction">Ajouter une transaction</Link></li>
                    <li><Link to="/graph">Graphique</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <button
                    className="btn text-white mr-5"
                    onClick={handleLogout}
                >
                    Déconnexion
                </button>
            </div>
        </div>
    );
};

export default Header;
