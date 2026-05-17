import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

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