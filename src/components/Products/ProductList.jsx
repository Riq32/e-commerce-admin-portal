import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../contexts/StoreContext';
import { useFetch } from '../../hooks/useFetch';
import { useSearch } from '../../hooks/useSearch';
import { deleteProduct } from '../../utils/api';
import SearchBar from '../Search/SearchBar';
import ProductCard from './ProductCard';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import './ProductList.css';

const ProductList = () => {
  const { products, setProducts, loading, setLoading, error, setError, refreshTrigger, refreshData } = useStore();
  const { data, loading: fetchLoading, error: fetchError, refetch } = useFetch('/api/products');

  const { searchTerm, setSearchTerm, filteredItems, resultCount } = useSearch(
    products, 
    ['name', 'description', 'origin', 'category']
  );

  useEffect(() => {
    if (data) {
      // Ensure data is an array before setting
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.warn('Expected array from API /products, got:', typeof data, data);
        setProducts([]);
      }
    }
  }, [data, setProducts]);

  useEffect(() => {
    setLoading(fetchLoading);
  }, [fetchLoading, setLoading]);

  useEffect(() => {
    setError(fetchError);
  }, [fetchError, setError]);

  useEffect(() => {
    if (refreshTrigger) {
      refetch();
    }
  }, [refreshTrigger, refetch]);

  // Delete product function
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter(product => product.id !== productId));
      refreshData();
      alert('Product deleted successfully!');
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product. Please try again.');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="product-list-page">
      <div className="page-header">
        <h1>Product Management</h1>
        <Link to="/add-product" className="btn-primary">
          ➕ Add New Product
        </Link>
      </div>

      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        placeholder="Search products by name, description, or origin..."
      />

      <div className="product-stats">
        <p>Showing {resultCount} of {products.length} products</p>
      </div>

      <div className="products-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onDelete={handleDeleteProduct}
            />
          ))
        ) : (
          <div className="no-results">
            <p>No products found matching "{searchTerm}"</p>
            <button onClick={() => setSearchTerm('')} className="btn-secondary">
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;