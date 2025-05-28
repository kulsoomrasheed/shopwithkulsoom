import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../features/favorites/favoritesSlice';
import { Loader } from '../components/ProductCard';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state) => state.favorites.items);
  const isFavorite = favoriteIds.includes(Number(id));

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(setProduct)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(Number(id)));
    } else {
      dispatch(addFavorite(Number(id)));
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!product) return null;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Products</Link>
      <div className="flex flex-col md:flex-row gap-6 bg-white rounded shadow p-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-60 w-60 object-contain mx-auto md:mx-0 bg-gray-50 rounded"
        />
        <div className="flex-1 flex flex-col">
          <span className="inline-block bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded mb-2 w-fit">{product.category}</span>
          <h1 className="text-2xl font-bold mb-2" title={product.title}>{product.title}</h1>
          <div className="text-blue-700 font-bold text-xl mb-2">${product.price}</div>
          <div className="mb-2 text-sm text-gray-600">{product.description}</div>
          {product.rating && (
            <div className="mb-2 text-yellow-600 flex items-center gap-1">
              <span className="font-semibold">Rating:</span> {product.rating.rate} / 5
              <span className="text-gray-400">({product.rating.count} reviews)</span>
            </div>
          )}
          <button
            className={`mt-4 px-4 py-2 rounded text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors duration-150 ${isFavorite ? 'bg-red-500' : 'bg-blue-600'} hover:opacity-90 w-full md:w-auto`}
            onClick={handleFavorite}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage; 