import React, { useState, useId, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePost } from '../../hooks/useFetch';
import { useStore } from '../../contexts/StoreContext';
import './AddProductForm.css';

const AddProductForm = () => {
  const navigate = useNavigate();
  const { refreshData } = useStore();
  const { postData, loading, error } = usePost();
  
  // Using useId for accessible form labels
  const nameId = useId();
  const descId = useId();
  const originId = useId();
  const priceId = useId();
  const stockId = useId();
  const roastId = useId();
  const categoryId = useId();
  const imageId = useId();
  
  // Using useRef for focus management and file input
  const nameInputRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    origin: '',
    price: '',
    stock: '',
    roast_level: 'Medium',
    category: '',
    inStock: true,
    image_url: 'https://via.placeholder.com/300x200?text=New+Coffee',
    image_file: null // For storing the actual image file
  });
  
  const [imagePreview, setImagePreview] = useState('https://via.placeholder.com/300x200?text=New+Coffee');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Focus the name input when component mounts
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? parseFloat(value) : value
    }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPEG, PNG, GIF, etc.)');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      setUploadingImage(true);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      // In a real app, you would upload to a server here
      // For this demo, we'll convert to base64 or use a temporary URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image_file: file,
          image_url: reader.result // Store base64 string
        }));
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image URL input (for external images)
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({
      ...prev,
      image_url: url
    }));
    setImagePreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.description || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // Prepare product data without the id field
      const newProduct = {
        name: formData.name,
        description: formData.description,
        origin: formData.origin,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        category: formData.category,
        roast_level: formData.roast_level,
        inStock: formData.inStock,
        image_url: formData.image_url || imagePreview // Use uploaded image or URL
      };
      
      console.log('Adding new product:', newProduct);
      await postData('/api/products', newProduct);
      refreshData(); // Trigger data refresh
      navigate('/products'); // Redirect to products page
    } catch (err) {
      console.error('Failed to add product:', err);
      alert('Failed to add product. Please make sure JSON Server is running.');
    }
  };

  return (
    <div className="add-product-page">
      <div className="form-header">
        <h1>Add New Product</h1>
        <button onClick={() => navigate('/products')} className="btn-back">
          ← Back to Products
        </button>
      </div>

      <div className="form-container">
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="product-form">
          {/* Image Upload Section */}
          <div className="form-group image-upload-section">
            <label>Product Image</label>
            <div className="image-preview-container">
              <img 
                src={imagePreview} 
                alt="Product preview" 
                className="image-preview"
              />
              {uploadingImage && (
                <div className="upload-overlay">
                  <div className="spinner-small"></div>
                </div>
              )}
            </div>
            
            <div className="image-input-group">
              <div className="image-upload-options">
                <button 
                  type="button"
                  className="btn-upload"
                  onClick={() => fileInputRef.current.click()}
                >
                  📁 Upload Image File
                </button>
                <input
                  ref={fileInputRef}
                  id={imageId}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <span className="upload-or">OR</span>
                <input
                  type="text"
                  name="image_url_input"
                  placeholder="Enter image URL (optional)"
                  onChange={handleImageUrlChange}
                  className="image-url-input"
                />
              </div>
              <p className="image-hint">
                Supported formats: JPEG, PNG, GIF, WebP (Max 5MB)
              </p>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor={nameId}>Product Name *</label>
            <input
              ref={nameInputRef}
              id={nameId}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Sumatra Mandheling"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={descId}>Description *</label>
            <textarea
              id={descId}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the product, including flavor notes, characteristics, etc."
              rows="4"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor={originId}>Origin *</label>
              <input
                id={originId}
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                placeholder="e.g., Colombia, Ethiopia, Sumatra"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor={roastId}>Roast Level</label>
              <select
                id={roastId}
                name="roast_level"
                value={formData.roast_level}
                onChange={handleChange}
              >
                <option value="Light">Light Roast</option>
                <option value="Medium">Medium Roast</option>
                <option value="Dark">Dark Roast</option>
                <option value="Extra Dark">Extra Dark Roast</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor={priceId}>Price ($) *</label>
              <input
                id={priceId}
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                placeholder="0.00"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor={stockId}>Initial Stock</label>
              <input
                id={stockId}
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor={categoryId}>Category</label>
              <input
                id={categoryId}
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Single Origin, Blend, Espresso"
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
              Mark as In Stock
            </label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/products')} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading || uploadingImage}>
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;