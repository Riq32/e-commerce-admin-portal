import { useState, useMemo, useCallback } from 'react';

export const useSearch = (items = [], searchFields = ['name', 'description']) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim() || !items.length) {
      return items;
    }

    const lowercaseSearch = searchTerm.toLowerCase();
    
    return items.filter(item => {
      return searchFields.some(field => {
        const fieldValue = item[field];
        return fieldValue && fieldValue.toString().toLowerCase().includes(lowercaseSearch);
      });
    });
  }, [items, searchTerm, searchFields]);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
    clearSearch,
    hasResults: filteredItems.length > 0,
    resultCount: filteredItems.length
  };
};