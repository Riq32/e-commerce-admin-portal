import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import LandingPage from './components/Landing/LandingPage';
import ProductList from './components/Products/ProductList';
import ProductDetail from './components/Products/ProductDetail';
import AddProductForm from './components/Form/AddProductForm';
import './styles/App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="add-product" element={<AddProductForm />} />
      </Route>
    </Routes>
  );
}

export default App;