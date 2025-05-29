import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import filtersReducer from '../features/filters/filtersSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import ProductListPage from './ProductListPage';
import { act } from 'react';

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

describe('ProductListPage', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productsReducer,
        filters: filtersReducer,
        favorites: favoritesReducer
      },
      preloadedState: {
        products: { items: mockProducts, status: 'succeeded', error: null },
        filters: { search: '', category: 'all', sort: 'asc' },
        favorites: { items: [] }
      }
    });
  });

  const renderWithStore = async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <ProductListPage />
        </Provider>
      );
    });
  };

  it('renders loading state initially', async () => {
    store = configureStore({
      reducer: {
        products: productsReducer,
        filters: filtersReducer,
        favorites: favoritesReducer
      },
      preloadedState: {
        products: { items: [], status: 'loading', error: null },
        filters: { search: '', category: 'all', sort: 'asc' },
        favorites: { items: [] }
      }
    });
    
    await renderWithStore();
    const loadingSpinner = screen.getByTestId('loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('shows products and can search by title', async () => {
    await renderWithStore();
    
    expect(screen.getByText('Red Shoes')).toBeInTheDocument();
    expect(screen.getByText('Blue Shirt')).toBeInTheDocument();
    
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/search by title/i), { target: { value: 'laptop' } });
    });

    await waitFor(() => {
      expect(screen.queryByText('Red Shoes')).not.toBeInTheDocument();
      expect(screen.queryByText('Blue Shirt')).not.toBeInTheDocument();
      expect(screen.getByText('Laptop')).toBeInTheDocument();
    });
  });

  it('can sort by price', async () => {
    await renderWithStore();
    
    await act(async () => {
      fireEvent.change(screen.getByDisplayValue('Price: Low to High'), { target: { value: 'desc' } });
    });

    const cards = screen.getAllByRole('heading', { level: 2 });
    expect(cards[0]).toHaveTextContent('Laptop'); // highest price first
  });

  it('can favorite and unfavorite a product', async () => {
    await renderWithStore();
    
    const favButton = screen.getAllByRole('button', { name: /add to favorites/i })[0];
    
    await act(async () => {
      fireEvent.click(favButton);
    });
    expect(favButton).toHaveAttribute('aria-pressed', 'true');
    
    await act(async () => {
      fireEvent.click(favButton);
    });
    expect(favButton).toHaveAttribute('aria-pressed', 'false');
  });
}); 