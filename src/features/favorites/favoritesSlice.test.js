import favoritesReducer, { addFavorite, removeFavorite } from './favoritesSlice';

describe('favoritesSlice', () => {
  const initialState = {
    items: []
  };

  it('should return the initial state', () => {
    expect(favoritesReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  describe('reducers', () => {
    it('should handle adding a new favorite', () => {
      const productId = 1;
      const nextState = favoritesReducer(initialState, addFavorite(productId));
      expect(nextState.items).toContain(productId);
    });

    it('should not add duplicate favorites', () => {
      const productId = 1;
      const stateWithFavorite = {
        items: [productId]
      };
      const nextState = favoritesReducer(stateWithFavorite, addFavorite(productId));
      expect(nextState.items).toEqual([productId]);
      expect(nextState.items.length).toBe(1);
    });

    it('should handle removing a favorite', () => {
      const productId = 1;
      const stateWithFavorite = {
        items: [productId]
      };
      const nextState = favoritesReducer(stateWithFavorite, removeFavorite(productId));
      expect(nextState.items).not.toContain(productId);
      expect(nextState.items.length).toBe(0);
    });

    it('should handle removing a non-existent favorite', () => {
      const productId = 1;
      const nonExistentId = 2;
      const stateWithFavorite = {
        items: [productId]
      };
      const nextState = favoritesReducer(stateWithFavorite, removeFavorite(nonExistentId));
      expect(nextState.items).toEqual([productId]);
      expect(nextState.items.length).toBe(1);
    });

    it('should handle multiple favorites', () => {
      const productIds = [1, 2, 3];
      let state = initialState;
      
      // Add multiple favorites
      productIds.forEach(id => {
        state = favoritesReducer(state, addFavorite(id));
      });
      expect(state.items).toEqual(productIds);
      
      // Remove middle favorite
      state = favoritesReducer(state, removeFavorite(2));
      expect(state.items).toEqual([1, 3]);
    });
  });
}); 