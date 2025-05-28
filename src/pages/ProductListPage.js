import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import { setSearch, setCategory, setSort } from '../features/filters/filtersSlice';
import { addFavorite, removeFavorite } from '../features/favorites/favoritesSlice';
import ProductCard, { Loader } from '../components/ProductCard';

function ProductListPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const { search, category, sort } = useSelector((state) => state.filters);
  const favoriteIds = useSelector((state) => state.favorites.items);
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState(search);

  // Fetch products on mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // Fetch categories on mount
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearch(searchInput));
    }, 400);
    return () => clearTimeout(handler);
  }, [searchInput, dispatch]);

  // Filter and sort products
  const filtered = items
    .filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === 'all' || p.category === category)
    )
    .sort((a, b) =>
      sort === 'asc' ? a.price - b.price : b.price - a.price
    );

  const handleFavorite = useCallback(
    (id) => {
      if (favoriteIds.includes(id)) {
        dispatch(removeFavorite(id));
      } else {
        dispatch(addFavorite(id));
      }
    },
    [dispatch, favoriteIds]
  );

  if (status === 'loading') return <Loader />;
  if (status === 'failed') return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
  <div className="max-w-7xl mx-auto px-6 py-8">
    
    {/* Search & Filter Bar */}
    <div className="flex flex-col md:flex-row gap-2 mb-6 md:sticky md:top-0 bg-white/90 z-10 py-3 px-4 rounded-xl shadow-lg border border-blue-100 backdrop-blur">
      <div className="flex items-center gap-2 flex-1">
        <input
          type="text"
          placeholder="Search by title..."
          className="border border-gray-200 rounded px-3 py-2 flex-1 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-gray-50"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <select
          className="border border-gray-200 rounded px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          value={category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <select
          className="border border-gray-200 rounded px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          value={sort}
          onChange={(e) => dispatch(setSort(e.target.value))}
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
    </div>

    {/* Products Display */}
    {filtered.length === 0 ? (
      <div className="text-center text-gray-500 mt-24 text-xl font-medium">
        No products found.
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favoriteIds.includes(product.id)}
            onFavorite={handleFavorite}
          />
        ))}
      </div>
    )}
  </div>
</div>

  );
}

export default ProductListPage; 