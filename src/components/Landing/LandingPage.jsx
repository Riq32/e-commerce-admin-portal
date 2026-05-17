import React from 'react';
import { useStore } from '../../contexts/StoreContext';
import { useFetch } from '../../hooks/useFetch';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import './LandingPage.css';

const LandingPage = () => {
  const { storeInfo, setStoreInfo } = useStore();
  const { loading, error } = useFetch('/api/store_info/1', {
    method: 'GET',
    onSuccess: (data) => setStoreInfo(data)
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="landing-page">
      <section className="hero-section">
        <h1>Welcome to {storeInfo?.name || 'Coffee R Us'}</h1>
        <p className="hero-description">{storeInfo?.description}</p>
      </section>

      <section className="features-section">
        <h2>Administrator Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Manage Products</h3>
            <p>View, edit, and update product information including prices, descriptions, and stock levels</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">➕</div>
            <h3>Add New Products</h3>
            <p>Easily add new products to your inventory with our simple form interface</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Search Products</h3>
            <p>Quickly find products using our dynamic search functionality</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✏️</div>
            <h3>Real-time Updates</h3>
            <p>Changes are saved instantly with our PATCH request implementation</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;