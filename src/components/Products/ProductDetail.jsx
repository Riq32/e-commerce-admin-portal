import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch, usePatch } from '../../hooks/useFetch';
import { useStore } from '../../contexts/StoreContext';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import ProductEdit from './ProductEdit';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshData } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [product, setProduct] = useState(null);
  
  const { data, loading, error, refetch } = useFetch(`/api/products/${id}`);
  const { patchData, loading: patchLoading, error: patchError } = usePatch();

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);

  // Handle product update
  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await patchData(`/api/products/${id}`, updatedProduct);
      await refetch(); // Refresh the product data
      setIsEditing(false);
      refreshData(); // Trigger refresh in parent component
    } catch (err) {
      console.error('Failed to update product:', err);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  return (
    <div className="product-detail-page">
      <div className="detail-header">
        <button onClick={() => navigate('/products')} className="btn-back">
          Back to Products
        </button>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="btn-edit">
            Edit Product
          </button>
        )}
      </div>

      {isEditing ? (
        <ProductEdit 
          product={product}
          onSave={handleUpdateProduct}
          onCancel={handleCancelEdit}
          loading={patchLoading}
          error={patchError}
        />
      ) : (
        <div className="product-detail-view">
          <div className="detail-image">
            <img src={product.image_url} alt={product.name} />
          </div>
          <div className="detail-info">
            <h1>{product.name}</h1>
            <div className="detail-section">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            <div className="detail-grid">
              <div>
                <strong>Origin:</strong>
                <p>{product.origin}</p>
              </div>
              <div>
                <strong>Roast Level:</strong>
                <p>{product.roast_level}</p>
              </div>
              <div>
                <strong>Category:</strong>
                <p>{product.category}</p>
              </div>
              <div>
                <strong>Price:</strong>
                <p className="price-large">${product.price.toFixed(2)}</p>
              </div>
              <div>
                <strong>Stock Quantity:</strong>
                <p className={product.stock < 10 ? 'low-stock' : ''}>
                  {product.stock} units
                  {product.stock < 10 && ' ⚠️ Low Stock'}
                </p>
              </div>
              <div>
                <strong>Status:</strong>
                <p className={product.inStock ? 'in-stock' : 'out-of-stock'}>
                  {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;