import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="nav-blur flex justify-between items-center px-10 py-4">
      <Link to="/" className="text-2xl font-black bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform">
        🛒 ProductManager
      </Link>
      <div className="flex items-center gap-4">
        <Link 
          to="/" 
          className={`px-4 py-2 rounded-lg font-medium transition-all ${location.pathname === '/' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          Products
        </Link>
        <Link 
          to="/add" 
          className={`px-4 py-2 rounded-lg font-medium transition-all ${location.pathname === '/add' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          + Add Product
        </Link>
        <Link 
          to="/dashboard" 
          className={`px-4 py-2 rounded-lg font-medium transition-all ${location.pathname === '/dashboard' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          Stats
        </Link>
        <div className="h-6 w-px bg-white/10 mx-2"></div>
        <button 
          onClick={handleLogout} 
          className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-lg font-bold text-sm transition-all"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;