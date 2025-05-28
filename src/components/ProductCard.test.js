import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  const product = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    image: 'https://example.com/image.jpg',
    category: 'electronics',
  };

  it('renders product info', () => {
    render(<ProductCard product={product} isFavorite={false} onFavorite={() => {}} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /test product/i })).toBeInTheDocument();
  });

  it('shows correct favorite state and button text', () => {
    const { rerender } = render(<ProductCard product={product} isFavorite={false} onFavorite={() => {}} />);
    expect(screen.getByRole('button', { name: /add to favorites/i })).toBeInTheDocument();
    rerender(<ProductCard product={product} isFavorite={true} onFavorite={() => {}} />);
    expect(screen.getByRole('button', { name: /remove favorite/i })).toBeInTheDocument();
  });

  it('calls onFavorite when main button is clicked', () => {
    const onFavorite = jest.fn();
    render(<ProductCard product={product} isFavorite={false} onFavorite={onFavorite} />);
    fireEvent.click(screen.getByRole('button', { name: /add to favorites/i }));
    expect(onFavorite).toHaveBeenCalledWith(1);
  });

  it('calls onFavorite when heart icon is clicked', () => {
    const onFavorite = jest.fn();
    render(<ProductCard product={product} isFavorite={false} onFavorite={onFavorite} />);
    fireEvent.click(screen.getByLabelText('Toggle favorite heart'));
    expect(onFavorite).toHaveBeenCalledWith(1);
  });

  it('main button has correct aria-pressed attribute', () => {
    const { rerender } = render(<ProductCard product={product} isFavorite={false} onFavorite={() => {}} />);
    expect(screen.getByRole('button', { name: /add to favorites/i })).toHaveAttribute('aria-pressed', 'false');
    rerender(<ProductCard product={product} isFavorite={true} onFavorite={() => {}} />);
    expect(screen.getByRole('button', { name: /remove favorite/i })).toHaveAttribute('aria-pressed', 'true');
  });
}); 