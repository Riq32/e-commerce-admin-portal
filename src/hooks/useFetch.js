import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useFetch = (url, options = { method: 'GET' }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios({
        url,
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

/**
 * Custom hook for making POST requests
 */
export const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = useCallback(async (url, postData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(url, postData, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { postData, loading, error };
};

/**
 * Custom hook for making PATCH requests
 */
export const usePatch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const patchData = useCallback(async (url, updateData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.patch(url, updateData, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { patchData, loading, error };
};