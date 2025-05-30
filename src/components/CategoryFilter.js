import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, fetchCategories } from '../features/filters/filtersSlice';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const { categories, categoriesStatus, category } = useSelector((state) => state.filters);

  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories());
    }
  }, [categoriesStatus, dispatch]);

  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value));
  };

  if (categoriesStatus === 'loading') {
    return <div data-testid="category-loading" className="animate-pulse h-10 bg-gray-200 rounded w-48"></div>;
  }

  if (categoriesStatus === 'failed') {
    return (
      <div className="text-red-500">
        Error loading categories. Please try again later.
      </div>
    );
  }

  return (
    <div className="w-48">
      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
        Category
      </label>
      <select
        id="category"
        value={category}
        onChange={handleCategoryChange}
        className="block w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter; 