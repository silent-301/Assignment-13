import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';

const ProductList = () => {
  const { filteredProducts, loading, error, deleteProduct, searchTerm, setSearchTerm } = useContext(ProductContext);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-10 py-12 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
        <div>
          <h1 className="text-5xl font-black text-white mb-2">Our Products</h1>
          <p className="text-slate-400">Discover and manage your premium catalog</p>
        </div>
        
        <div className="relative group min-w-[300px]">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full glass-card bg-white/5 border-white/10 px-6 py-4 rounded-full text-white outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-lg pl-14"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="glass-card flex flex-col group hover:-translate-y-2 transition-all hover:border-indigo-500/50 hover:shadow-indigo-500/10">
            <div className="h-56 relative overflow-hidden rounded-t-3xl">
              <img 
                src={product.thumbnail} 
                alt={product.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-slate-900/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">
                {product.category}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-bold text-xl text-white mb-2 truncate" title={product.title}>{product.title}</h3>
              <p className="text-2xl font-black text-indigo-400 mb-6">Rs {product.price}</p>
              
              <div className="grid grid-cols-2 gap-3 mt-auto">
                <Link to={`/product/${product.id}`} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-2 rounded-xl text-center text-sm transition-colors">
                  View
                </Link>
                <Link to={`/edit/${product.id}`} className="flex-1 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white font-bold py-2 rounded-xl text-center text-sm transition-all border border-indigo-500/20">
                  Edit
                </Link>
                <button 
                  onClick={() => deleteProduct(product.id)} 
                  className="col-span-2 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white font-bold py-2 rounded-xl text-center text-sm transition-all border border-red-500/10 mt-1"
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 mt-10">
          <p className="text-2xl font-bold text-slate-500">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;