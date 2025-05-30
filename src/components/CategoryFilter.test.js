import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from '../features/filters/filtersSlice';
import CategoryFilter from './CategoryFilter';

describe('CategoryFilter', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        filters: filtersReducer,
      },
    });
  });

  it('shows loading state initially', () => {
    render(
      <Provider store={store}>
        <CategoryFilter />
      </Provider>
    );
    const loadingElement = screen.getByTestId('category-loading');
    expect(loadingElement).toHaveClass('animate-pulse');
  });

  it('renders categories when loaded', () => {
    store = configureStore({
      reducer: {
        filters: filtersReducer,
      },
      preloadedState: {
        filters: {
          categories: ['electronics', 'clothing'],
          categoriesStatus: 'succeeded',
          category: 'all',
        },
      },
    });

    render(
      <Provider store={store}>
        <CategoryFilter />
      </Provider>
    );

    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByText('All Categories')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Clothing')).toBeInTheDocument();
  });

  it('shows error state when loading fails', () => {
    store = configureStore({
      reducer: {
        filters: filtersReducer,
      },
      preloadedState: {
        filters: {
          categories: [],
          categoriesStatus: 'failed',
          category: 'all',
        },
      },
    });

    render(
      <Provider store={store}>
        <CategoryFilter />
      </Provider>
    );

    expect(screen.getByText(/error loading categories/i)).toBeInTheDocument();
  });

  it('dispatches setCategory action on selection change', () => {
    store = configureStore({
      reducer: {
        filters: filtersReducer,
      },
      preloadedState: {
        filters: {
          categories: ['electronics', 'clothing'],
          categoriesStatus: 'succeeded',
          category: 'all',
        },
      },
    });

    render(
      <Provider store={store}>
        <CategoryFilter />
      </Provider>
    );

    const select = screen.getByLabelText('Category');
    fireEvent.change(select, { target: { value: 'electronics' } });

    expect(store.getState().filters.category).toBe('electronics');
  });
}); 