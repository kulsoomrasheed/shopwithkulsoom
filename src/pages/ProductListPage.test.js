import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import filtersReducer from '../features/filters/filtersSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import ProductListPage from './ProductListPage';

const mockProducts = [
  { id: 1, title: 'Red Shoes', price: 50, image: 'test.jpg', category: 'fashion' },
  { id: 2, title: 'Blue Shirt', price: 30, image: 'test.jpg', category: 'fashion' },
  { id: 3, title: 'Laptop', price: 1000, image: 'test.jpg', category: 'electronics' },
];

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    if (url.includes('categories')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(['fashion', 'electronics']),
      });
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
  });
});
afterEach(() => {
  jest.restoreAllMocks();
});

function renderWithStore(
  {
    products = mockProducts,
    filters = { search: '', category: 'all', sort: 'asc' },
    favorites = { items: [] },
  } = {}
) {
  const store = configureStore({
    reducer: {
      products: productsReducer,
      filters: filtersReducer,
      favorites: favoritesReducer,
    },
    preloadedState: {
      products: { items: products, status: 'succeeded', error: null },
      filters,
      favorites,
    },
  });
  return render(
    <Provider store={store}>
      <ProductListPage />
    </Provider>
  );
}

describe('ProductListPage integration', () => {
  it('shows products and can search by title', async () => {
    renderWithStore();
    expect(screen.getByText('Red Shoes')).toBeInTheDocument();
    expect(screen.getByText('Blue Shirt')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText(/search by title/i), { target: { value: 'laptop' } });
    await waitFor(() => {
      expect(screen.queryByText('Red Shoes')).not.toBeInTheDocument();
      expect(screen.queryByText('Blue Shirt')).not.toBeInTheDocument();
      expect(screen.getByText('Laptop')).toBeInTheDocument();
    });
  });

  it('can sort by price', () => {
    renderWithStore();
    fireEvent.change(screen.getByDisplayValue('Price: Low to High'), { target: { value: 'desc' } });
    const cards = screen.getAllByRole('heading', { level: 2 });
    expect(cards[0]).toHaveTextContent('Laptop'); // highest price first
  });

  it('can favorite and unfavorite a product', () => {
    renderWithStore();
    const favButton = screen.getAllByRole('button', { name: /add to favorites/i })[0];
    fireEvent.click(favButton);
    expect(favButton).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(favButton);
    expect(favButton).toHaveAttribute('aria-pressed', 'false');
  });
}); 