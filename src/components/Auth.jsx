import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';

const Auth = ({ mode }) => {
  const isLogin = mode === 'login';
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const url = `${API_BASE_URL}/users/${isLogin ? 'login' : 'signup'}`;
      const res = await axios.post(url, formData);
      
      if (isLogin) {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      } else {
        alert("Account created successfully! Please login.");
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.error || "Authentication failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="glass-card p-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-5 duration-500">
        <h2 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-slate-400 text-center mb-8 text-sm">
          {isLogin ? 'Enter your details to access your account' : 'Join us today and start your journey'}
        </p>
        
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="glass-input"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                required
              />
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com" 
              className="glass-input"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="glass-input"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="primary-btn mt-2 inline-flex items-center justify-center" 
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link to={isLogin ? "/signup" : "/login"} className="text-indigo-400 font-bold hover:text-indigo-300 hover:underline">
            {isLogin ? "Sign Up" : "Log In"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;