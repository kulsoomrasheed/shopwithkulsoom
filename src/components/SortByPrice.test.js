import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from '../features/filters/filtersSlice';
import SortByPrice from './SortByPrice';

describe('SortByPrice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        filters: filtersReducer,
      },
      preloadedState: {
        filters: {
          sort: 'asc',
        },
      },
    });
  });

  it('renders sort options', () => {
    render(
      <Provider store={store}>
        <SortByPrice />
      </Provider>
    );

    expect(screen.getByLabelText('Sort by Price')).toBeInTheDocument();
    expect(screen.getByText('Low to High')).toBeInTheDocument();
    expect(screen.getByText('High to Low')).toBeInTheDocument();
  });

  it('displays current sort value', () => {
    render(
      <Provider store={store}>
        <SortByPrice />
      </Provider>
    );

    const select = screen.getByLabelText('Sort by Price');
    expect(select.value).toBe('asc');
  });

  it('dispatches setSort action on selection change', () => {
    render(
      <Provider store={store}>
        <SortByPrice />
      </Provider>
    );

    const select = screen.getByLabelText('Sort by Price');
    fireEvent.change(select, { target: { value: 'desc' } });

    expect(store.getState().filters.sort).toBe('desc');
  });

  it('maintains selected value after re-render', () => {
    const { rerender } = render(
      <Provider store={store}>
        <SortByPrice />
      </Provider>
    );

    const select = screen.getByLabelText('Sort by Price');
    fireEvent.change(select, { target: { value: 'desc' } });

    rerender(
      <Provider store={store}>
        <SortByPrice />
      </Provider>
    );

    expect(select.value).toBe('desc');
  });
}); 