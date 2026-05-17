import React, { useState, useId } from 'react';
import './ProductEdit.css';

const ProductEdit = ({ product, onSave, onCancel, loading, error }) => {
  const nameId = useId();
  const descId = useId();
  const originId = useId();
  const priceId = useId();
  const stockId = useId();
  const roastId = useId();
  const categoryId = useId();

  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    origin: product.origin,
    price: product.price,
    stock: product.stock,
    roast_level: product.roast_level,
    category: product.category,
    inStock: product.inStock
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="product-edit-form-container">
      <h2>Edit Product: {product.name}</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="product-edit-form">
        <div className="form-group">
          <label htmlFor={nameId}>Product Name:</label>
          <input
            id={nameId}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor={descId}>Description:</label>
          <textarea
            id={descId}
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor={originId}>Origin:</label>
            <input
              id={originId}
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={roastId}>Roast Level:</label>
            <select
              id={roastId}
              name="roast_level"
              value={formData.roast_level}
              onChange={handleChange}
            >
              <option value="Light">Light</option>
              <option value="Medium">Medium</option>
              <option value="Dark">Dark</option>
              <option value="Extra Dark">Extra Dark</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor={priceId}>Price ($):</label>
            <input
              id={priceId}
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={stockId}>Stock Quantity:</label>
            <input
              id={stockId}
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={categoryId}>Category:</label>
            <input
              id={categoryId}
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
            />
            In Stock
          </label>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-secondary" disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;