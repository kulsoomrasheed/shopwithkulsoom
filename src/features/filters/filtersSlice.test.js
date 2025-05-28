import filtersReducer, { setSearch, setCategory, setSort } from './filtersSlice';

describe('filtersSlice', () => {
  it('should return the initial state', () => {
    expect(filtersReducer(undefined, { type: undefined })).toEqual({
      search: '',
      category: 'all',
      sort: 'asc',
    });
  });

  it('should set search', () => {
    const state = { search: '', category: 'all', sort: 'asc' };
    const nextState = filtersReducer(state, setSearch('shoes'));
    expect(nextState.search).toBe('shoes');
  });

  it('should set category', () => {
    const state = { search: '', category: 'all', sort: 'asc' };
    const nextState = filtersReducer(state, setCategory('electronics'));
    expect(nextState.category).toBe('electronics');
  });

  it('should set sort', () => {
    const state = { search: '', category: 'all', sort: 'asc' };
    const nextState = filtersReducer(state, setSort('desc'));
    expect(nextState.sort).toBe('desc');
  });
}); 