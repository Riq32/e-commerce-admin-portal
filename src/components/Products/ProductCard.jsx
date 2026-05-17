import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onDelete }) => {
  const productId = product.id;
  
  const handleDelete = (e) => {
    e.preventDefault(); // Prevent navigation
    if (window.confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
      onDelete(productId);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image_url} alt={product.name} />
        {!product.inStock && <span className="out-of-stock-badge">Out of Stock</span>}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-meta">
          <span className="product-origin">{product.origin}</span>
          <span className="product-roast">{product.roast_level}</span>
        </div>
        <div className="product-price-stock">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span className="product-stock">Stock: {product.stock} units</span>
        </div>
        <div className="product-actions">
          <Link to={`/products/${productId}`} className="btn-edit">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn-delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;