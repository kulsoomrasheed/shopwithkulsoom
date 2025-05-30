import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../features/filters/filtersSlice';

const SortByPrice = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filters.sort);

  const handleSortChange = (e) => {
    dispatch(setSort(e.target.value));
  };

  return (
    <div className="w-48">
      <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
        Sort by Price
      </label>
      <select
        id="sort"
        value={sort}
        onChange={handleSortChange}
        className="block w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </div>
  );
};

export default SortByPrice; 