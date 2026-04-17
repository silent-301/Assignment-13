
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  thumbnail: { type: String },
  description: { type: String },
  rating: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  brand: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
module.exports=Product;