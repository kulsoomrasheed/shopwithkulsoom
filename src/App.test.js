import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import filtersReducer from './features/filters/filtersSlice';
import favoritesReducer from './features/favorites/favoritesSlice';
import App from './App';

test('renders navigation elements', () => {
  const store = configureStore({
    reducer: {
      products: productsReducer,
      filters: filtersReducer,
      favorites: favoritesReducer
    }
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  
  // Check for the app name
  expect(screen.getByText('ShopWithKulsoom')).toBeInTheDocument();
  
  // Check for navigation links
  expect(screen.getByText('Products')).toBeInTheDocument();
  expect(screen.getByText('Favorites')).toBeInTheDocument();
});
