import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="navbar bg-[#f5f5f5] text-black border-b border-gray-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-[#f5f5f5] text-black rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><Link to="/">Acceuil</Link></li>
                        <li><Link to="/create">Ajouter une transaction</Link></li>
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl text-black">Soldout</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-black">
                    <li><Link to="/">Acceuil</Link></li>
                    <li><Link to="/create-transaction">Ajouter une transaction</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <button className="btn text-white" onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    window.location.href = '/login';
                }}>Logout</button>
            </div>
        </div>
    );
};

export default Header;
