import productsReducer, { 
  fetchProducts, 
  resetError, 
  incrementRetryCount 
} from './productsSlice';

describe('productsSlice', () => {
  const initialState = {
    items: [],
    status: 'idle',
    error: null,
    retryCount: 0
  };

  it('should return the initial state', () => {
    expect(productsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  describe('reducers', () => {
    it('should handle resetError', () => {
      const state = {
        ...initialState,
        error: 'Some error',
        status: 'failed'
      };
      const nextState = productsReducer(state, resetError());
      expect(nextState.error).toBeNull();
      expect(nextState.status).toBe('idle');
    });

    it('should handle incrementRetryCount', () => {
      const state = {
        ...initialState,
        retryCount: 1
      };
      const nextState = productsReducer(state, incrementRetryCount());
      expect(nextState.retryCount).toBe(2);
    });
  });

  describe('async thunks', () => {
    it('should handle fetchProducts.pending', () => {
      const state = { ...initialState };
      const nextState = productsReducer(state, { type: fetchProducts.pending.type });
      expect(nextState.status).toBe('loading');
      expect(nextState.error).toBeNull();
    });

    it('should handle fetchProducts.fulfilled', () => {
      const state = { ...initialState, status: 'loading' };
      const products = [
        { id: 1, title: 'Test Product 1' },
        { id: 2, title: 'Test Product 2' }
      ];
      const nextState = productsReducer(state, {
        type: fetchProducts.fulfilled.type,
        payload: products
      });
      expect(nextState.status).toBe('succeeded');
      expect(nextState.items).toEqual(products);
      expect(nextState.error).toBeNull();
      expect(nextState.retryCount).toBe(0);
    });

    it('should handle fetchProducts.rejected with retry count under limit', () => {
      const state = {
        ...initialState,
        status: 'loading',
        retryCount: 1
      };
      const error = 'Failed to fetch';
      const nextState = productsReducer(state, {
        type: fetchProducts.rejected.type,
        payload: error
      });
      expect(nextState.status).toBe('failed');
      expect(nextState.error).toBe(error);
    });

    it('should handle fetchProducts.rejected with max retry count', () => {
      const state = {
        ...initialState,
        status: 'loading',
        retryCount: 3
      };
      const nextState = productsReducer(state, {
        type: fetchProducts.rejected.type,
        payload: 'Some error'
      });
      expect(nextState.status).toBe('failed');
      expect(nextState.error).toBe('Maximum retry attempts reached. Please try again later.');
    });

    it('should handle fetchProducts.rejected with unknown error', () => {
      const state = { ...initialState, status: 'loading' };
      const nextState = productsReducer(state, {
        type: fetchProducts.rejected.type
      });
      expect(nextState.status).toBe('failed');
      expect(nextState.error).toBe('An unknown error occurred');
    });
  });
}); 