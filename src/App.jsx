import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth'; 
import Dashboard from './components/Dashboard'; 


import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { ProductProvider } from './context/ProductContext';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import AddEditProduct from './pages/AddEditProduct';

function App() {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Auth mode="login" />} />
          <Route path="/signup" element={<Auth mode="signup" />} />

          {/* Protected App Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <>
                <Navbar />
                <ProductList />
              </>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Dashboard />
              </>
            </ProtectedRoute>
          } />

          <Route path="/add" element={
            <ProtectedRoute>
              <>
                <Navbar />
                <AddEditProduct />
              </>
            </ProtectedRoute>
          } />

          <Route path="/edit/:id" element={
            <ProtectedRoute>
              <>
                <Navbar />
                <AddEditProduct />
              </>
            </ProtectedRoute>
          } />

          <Route path="/product/:id" element={
            <ProtectedRoute>
              <>
                <Navbar />
                <ProductDetails />
              </>
            </ProtectedRoute>
          } />

          {/* Redirect any other route to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;