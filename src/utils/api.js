import axios from 'axios';

// Determine API URL based on environment
const getApiUrl = () => {
  // Production (deployed with Vercel + Render)
  if (import.meta.env.PROD) {
    // Use VITE_API_BASE_URL set during build
    // Example: https://ecommerce-admin-backend.onrender.com
    return import.meta.env.VITE_API_BASE_URL || 'https://your-backend-url.onrender.com';
  }
  // Development (Vite proxy on localhost:3000 forwards to /api)
  return '/api';
};

const API_BASE_URL = getApiUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000
});

// Add logging for debugging
api.interceptors.request.use(request => {
  console.log('📤 API Request:', request.method.toUpperCase(), request.url);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log('📥 API Response:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// Store endpoints
export const fetchStoreInfo = () => api.get('/store_info/1');
export const updateStoreInfo = (data) => api.patch('/store_info/1', data);

// Product endpoints
export const fetchProducts = () => api.get('/products');
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (product) => api.post('/products', product);
export const updateProduct = (id, product) => api.patch(`/products/${id}`, product);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

export default api;