import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`);
        const result = await res.json();
        if (res.ok) {
          setProduct(result.data);
        } else {
          console.error("Product not found");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setLoading(false);
      }
    };

    fetchSingleProduct();
  }, [id]);

  if (loading) return <div className="loading">Loading details...</div>;
  if (!product) return <div className="error">Product not found.</div>;

  return (
    <div className="max-w-6xl mx-auto px-10 py-12 w-full">
      <button 
        onClick={() => navigate(-1)} 
        className="group flex items-center gap-2 text-slate-400 hover:text-white mb-10 transition-colors font-bold"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Products
      </button>
      
      <div className="glass-card overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="relative group overflow-hidden">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="w-full h-full object-cover min-h-[400px] group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
        </div>
        
        <div className="p-10 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <span className="bg-indigo-600/20 text-indigo-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-500/20">
              {product.category}
            </span>
            <div className="flex items-center gap-1.5 text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
              <span className="font-bold">{product.rating}</span>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            </div>
          </div>
          
          <h1 className="text-5xl font-black text-white mb-4 leading-tight">{product.title}</h1>
          
          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-4xl font-black text-indigo-500">
              Rs {product.price}
            </span>
            <span className="text-slate-500 line-through">Rs {Math.round(product.price * 1.2)}</span>
          </div>

          <div className="mb-10">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h7" /></svg>
              Description
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed">
              {product.description}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 p-6 bg-white/5 rounded-2xl border border-white/5 mt-auto">
            <div className="flex flex-col gap-1">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Inventory</p>
              <p className="text-white font-black text-xl">{product.stock} <span className="text-sm font-normal text-slate-400">units left</span></p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Brand</p>
              <p className="text-white font-black text-xl truncate">{product.brand || 'Premium Edition'}</p>
            </div>
          </div>

          <button className="primary-btn mt-8 w-full flex items-center justify-center gap-3 py-4 text-xl">
             Add to Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;