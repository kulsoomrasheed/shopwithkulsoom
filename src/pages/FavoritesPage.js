import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { removeFavorite } from '../features/favorites/favoritesSlice';
import { Link } from 'react-router-dom';

function FavoritesPage() {
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state) => state.favorites.items);
  const products = useSelector((state) => state.products.items);
  const favorites = products.filter((p) => favoriteIds.includes(p.id));

  const handleFavorite = (id) => {
    dispatch(removeFavorite(id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
      {favorites.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No favorites yet.<br />
          <Link to="/" className="text-blue-600 hover:underline">Browse products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={true}
              onFavorite={handleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage; 