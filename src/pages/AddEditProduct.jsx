import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import API_BASE_URL from '../apiConfig';

const AddEditProduct = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { setProducts, products } = useContext(ProductContext);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    thumbnail: 'https://via.placeholder.com/150',
    rating: 0,
    stock: 0,
    brand: ''
  });

  useEffect(() => {
    if (id && products.length > 0) {
      const existingProduct = products.find(p => p.id === id);
      if (existingProduct) {
        setFormData(existingProduct);
      }
    }
  }, [id, products]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = !!id;
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `${API_BASE_URL}/products/${id}` : `${API_BASE_URL}/products`;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const result = await res.json();

      if (res.ok) {
        if (isEdit) {
          const updatedProduct = { ...result.data, id: result.data._id };
          setProducts(products.map(p => p.id === id ? updatedProduct : p));
        } else {
          const newProduct = { ...result.product, id: result.product._id };
          setProducts([newProduct, ...products]);
        }
        navigate('/');
      } else {
        alert(result.error || "Failed to save product. Are you logged in?");
      }
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-10 py-12 w-full">
      <div className="glass-card p-10 relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/10 blur-3xl rounded-full"></div>
        
        <div className="relative">
          <h1 className="text-4xl font-black text-white mb-2">
            {id ? 'Update Product' : 'Create New Asset'}
          </h1>
          <p className="text-slate-400 mb-10">Define your product specifications for the catalog</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Product Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Premium Wireless Headphones"
                  className="glass-input"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category</label>
                <input
                  type="text"
                  name="category"
                  placeholder="e.g. Electronics"
                  className="glass-input"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Price (Rs)</label>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  className="glass-input"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  placeholder="0"
                  className="glass-input"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Thumbnail URL</label>
              <input
                type="url"
                name="thumbnail"
                placeholder="https://images.unsplash.com/..."
                className="glass-input"
                value={formData.thumbnail}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Description</label>
              <textarea
                name="description"
                placeholder="Describe your product features and benefits..."
                rows="4"
                className="glass-input resize-none"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-[2] primary-btn flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                {id ? 'Update Product' : 'Add to Catalog'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditProduct;