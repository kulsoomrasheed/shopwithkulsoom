import productsReducer, { fetchProducts } from './productsSlice';

describe('productsSlice', () => {
  it('should return the initial state', () => {
    expect(productsReducer(undefined, { type: undefined })).toEqual({
      items: [],
      status: 'idle',
      error: null,
    });
  });

  it('should handle fetchProducts.pending', () => {
    const state = { items: [], status: 'idle', error: null };
    const nextState = productsReducer(state, { type: fetchProducts.pending.type });
    expect(nextState.status).toBe('loading');
    expect(nextState.error).toBeNull();
  });

  it('should handle fetchProducts.fulfilled', () => {
    const state = { items: [], status: 'loading', error: null };
    const products = [{ id: 1, title: 'Test' }];
    const nextState = productsReducer(state, { type: fetchProducts.fulfilled.type, payload: products });
    expect(nextState.status).toBe('succeeded');
    expect(nextState.items).toEqual(products);
  });

  it('should handle fetchProducts.rejected', () => {
    const state = { items: [], status: 'loading', error: null };
    const error = { message: 'Failed' };
    const nextState = productsReducer(state, { type: fetchProducts.rejected.type, error });
    expect(nextState.status).toBe('failed');
    expect(nextState.error).toBe('Failed');
  });
}); 