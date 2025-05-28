import React from 'react';

function ProductCard({ product, isFavorite, onFavorite }) {
  return (
    <div className="border rounded-2xl p-5 flex flex-col h-full bg-white shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-200 relative group cursor-pointer">
      <span className="absolute top-6 right-6 z-10">
        <button
          aria-label="Toggle favorite heart"
          onClick={() => onFavorite(product.id)}
          className="focus:outline-none"
        >
          <span className={`inline-block transition-transform duration-200 ${isFavorite ? 'scale-110' : 'scale-100'} group-hover:scale-125`}>
            {isFavorite ? (
           
              <svg xmlns="http://www.w3.org/2000/svg" fill="#ef4444" viewBox="0 0 24 24" width="24" height="24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 
                       8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 
                       0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 
                       3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                       6.86-8.55 11.54L12 21.35z" />
            </svg>
            
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#ef4444" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
        d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 
           4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 
           4.5 0 010-6.364z" />
</svg>

            )}
          </span>
        </button>
      </span>
      <img
        src={product.image}
        alt={product.title}
        className="h-44 object-contain mb-3 rounded-xl bg-gradient-to-br from-blue-50 to-white"
      />
      <span className="inline-block bg-blue-100 text-xs text-blue-700 px-3 py-1 rounded-full mb-2 w-fit font-medium shadow-sm">{product.category}</span>
      <h2 className="font-semibold text-lg mb-1 line-clamp-2" title={product.title}>{product.title}</h2>
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold text-lg mb-2 px-3 py-1 rounded-xl w-fit shadow">${product.price}</div>
      <button
        className={`mt-auto px-4 py-2 rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors duration-150 ${isFavorite ? 'bg-red-500' : 'bg-blue-600'} hover:opacity-90`}
        onClick={() => onFavorite(product.id)}
        aria-pressed={isFavorite}
      >
        {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
      </button>
    </div>
  );
}

export default ProductCard;

// Loader component for circular progress
export function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/60 z-50">
      <svg className="animate-spin h-14 w-14 text-blue-600" viewBox="0 0 50 50">
        <circle className="opacity-20" cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="5" fill="none" />
        <circle className="opacity-70" cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="5" fill="none" strokeDasharray="31.4 94.2" />
      </svg>
    </div>
  );
} 