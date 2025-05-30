import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSearch } from '../features/filters/filtersSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useCallback(
    (() => {
      let timeoutId;
      return (value) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          dispatch(setSearch(value));
        }, 500); // 500ms delay
      };
    })(),
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    // Cleanup function to clear timeout on unmount
    return () => {
      if (debouncedSearch.current) {
        clearTimeout(debouncedSearch.current);
      }
    };
  }, [searchTerm, debouncedSearch]);

  return (
    <div className="relative w-full max-w-xl mx-auto mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        aria-label="Search products"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar; 