import favoritesReducer, { addFavorite, removeFavorite } from './favoritesSlice';

describe('favoritesSlice', () => {
  it('should return the initial state', () => {
    expect(favoritesReducer(undefined, { type: undefined })).toEqual({ items: [] });
  });

  it('should add a favorite', () => {
    const state = { items: [] };
    const nextState = favoritesReducer(state, addFavorite(1));
    expect(nextState.items).toContain(1);
  });

  it('should not add duplicate favorites', () => {
    const state = { items: [1] };
    const nextState = favoritesReducer(state, addFavorite(1));
    expect(nextState.items).toEqual([1]);
  });

  it('should remove a favorite', () => {
    const state = { items: [1, 2] };
    const nextState = favoritesReducer(state, removeFavorite(1));
    expect(nextState.items).toEqual([2]);
  });
}); 