import filtersReducer, {
  setSearch,
  setCategory,
  setSort,
  fetchCategories
} from './filtersSlice';

describe('filtersSlice', () => {
  const initialState = {
    search: '',
    category: 'all',
    sort: 'asc',
    categories: [],
    categoriesStatus: 'idle',
    categoriesError: null
  };

  it('should return the initial state', () => {
    expect(filtersReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  describe('reducers', () => {
    it('should handle setSearch', () => {
      const searchTerm = 'test product';
      const nextState = filtersReducer(initialState, setSearch(searchTerm));
      expect(nextState.search).toBe(searchTerm);
    });

    it('should handle setCategory', () => {
      const category = 'electronics';
      const nextState = filtersReducer(initialState, setCategory(category));
      expect(nextState.category).toBe(category);
    });

    it('should handle setSort', () => {
      const sort = 'desc';
      const nextState = filtersReducer(initialState, setSort(sort));
      expect(nextState.sort).toBe(sort);
    });
  });

  describe('async thunks', () => {
    it('should handle fetchCategories.pending', () => {
      const nextState = filtersReducer(initialState, {
        type: fetchCategories.pending.type
      });
      expect(nextState.categoriesStatus).toBe('loading');
      expect(nextState.categoriesError).toBeNull();
    });

    it('should handle fetchCategories.fulfilled', () => {
      const categories = ['electronics', 'clothing', 'books'];
      const nextState = filtersReducer(
        { ...initialState, categoriesStatus: 'loading' },
        {
          type: fetchCategories.fulfilled.type,
          payload: categories
        }
      );
      expect(nextState.categoriesStatus).toBe('succeeded');
      expect(nextState.categories).toEqual(categories);
      expect(nextState.categoriesError).toBeNull();
    });

    it('should handle fetchCategories.rejected with error message', () => {
      const error = 'Failed to fetch categories';
      const nextState = filtersReducer(
        { ...initialState, categoriesStatus: 'loading' },
        {
          type: fetchCategories.rejected.type,
          payload: error
        }
      );
      expect(nextState.categoriesStatus).toBe('failed');
      expect(nextState.categoriesError).toBe(error);
    });

    it('should handle fetchCategories.rejected with default error', () => {
      const nextState = filtersReducer(
        { ...initialState, categoriesStatus: 'loading' },
        {
          type: fetchCategories.rejected.type
        }
      );
      expect(nextState.categoriesStatus).toBe('failed');
      expect(nextState.categoriesError).toBe('Failed to fetch categories');
    });
  });
}); 