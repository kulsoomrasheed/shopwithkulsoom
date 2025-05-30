import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from '../features/filters/filtersSlice';
import SearchBar from './SearchBar';

// Mock timer functions
jest.useFakeTimers();

describe('SearchBar', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        filters: filtersReducer,
      },
    });
  });

  it('renders search input', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const input = screen.getByPlaceholderText('Search products...');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });

  it('debounces search dispatch', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const input = screen.getByPlaceholderText('Search products...');

    // Type 'test' into the input
    fireEvent.change(input, { target: { value: 'test' } });

    // Verify that the dispatch hasn't been called yet
    expect(store.getState().filters.search).toBe('');

    // Fast forward time by 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Now the dispatch should have been called
    expect(store.getState().filters.search).toBe('test');
  });

  it('cancels previous debounce on rapid typing', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const input = screen.getByPlaceholderText('Search products...');

    // Type 'test' quickly
    fireEvent.change(input, { target: { value: 'te' } });
    fireEvent.change(input, { target: { value: 'tes' } });
    fireEvent.change(input, { target: { value: 'test' } });

    // Advance time by 250ms (less than debounce time)
    act(() => {
      jest.advanceTimersByTime(250);
    });

    // The state should not have updated yet
    expect(store.getState().filters.search).toBe('');

    // Advance time to 500ms
    act(() => {
      jest.advanceTimersByTime(250);
    });

    // Now the state should be updated with the final value
    expect(store.getState().filters.search).toBe('test');
  });
}); 