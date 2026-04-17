require('dotenv').config();
const Product = require('../model/productModel');
// Create
const createProduct = async (req, res) => {
  try {
    const { title, price, category, thumbnail, description, rating, stock, brand } = req.body;
    const newProduct = new Product({
      title,
      price,
      category,
      thumbnail,
      description,
     
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "New Product Added", product: savedProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};        

// Read all
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "Data Retrieved", data: products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get By ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product fetched successfully", data: product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Updated Successfully", data: updatedProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
