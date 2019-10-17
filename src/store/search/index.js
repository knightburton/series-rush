import { createAction, handleActions } from 'redux-actions';
import { addAlert } from '../app';
import {
  getSearchFromQueryString,
  createSearchQueryString,
  parseSearchData,
} from '../../utils';
import { APP_PATHS } from '../../constants/paths';

// Initial state
export const initialState = {
  searchInProgress: false,
  query: '',
  type: '',
  page: null,
  numberOfPages: null,
  numberOfResults: null,
  results: [],
};

// Action types
export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';
export const STORE_SEARCH_PROPS = 'STORE_SEARCH_PROPS';
export const CLEAR_SEARCH_PROPS = 'CLEAR_SEARCH_PROPS';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';

// Action creators
export const searchRequest = createAction(
  SEARCH_REQUEST
);
export const searchSuccess = createAction(
  SEARCH_SUCCESS,
  ({ page, numberOfPages, numberOfResults, results }) => ({ page, numberOfPages, numberOfResults, results })
);
export const searchFailure = createAction(
  SEARCH_FAILURE
);
export const storeSearchProps = createAction(
  STORE_SEARCH_PROPS,
  props => props
);
export const clearSearchProps = createAction(
  CLEAR_SEARCH_PROPS
);
export const clearSearchResults = createAction(
  CLEAR_SEARCH_RESULTS
);

// Selectors
export const getSearchInProgress = state => state.search.searchInProgress;
export const getSearchQuery = state => state.search.query;
export const getSearchType = state => state.search.type;
export const getSearchPage = state => state.search.page;
export const getSearchNumberOfPages = state => state.search.numberOfPages;
export const getSearchNumberOfResults = state => state.search.numberOfResults;
export const getSearchResults = state => state.search.results;

// Reducer
export const reducer = handleActions(
  {
    [searchRequest]: state => ({ ...state, searchInProgress: true }),
    [searchSuccess]: (state, { payload: { page, numberOfPages, numberOfResults, results } }) => ({
      ...state,
      searchInProgress: false,
      page,
      numberOfPages,
      numberOfResults,
      results,
    }),
    [searchFailure]: state => ({ ...state, searchInProgress: false }),
    [storeSearchProps]: (state, { payload: props }) => ({ ...state, ...props }),
    [clearSearchProps]: state => ({ ...state, query: '', type: '', page: null }),
    [clearSearchResults]: state => ({ ...state, result: [] }),
  },
  initialState
);

// Thunk actions
export const prepareSearch = (query, type) => (dispatch, getState, { history }) => {
  dispatch(storeSearchProps({ query, type }));

  const { location } = history;
  const { query: searchQuery } = getSearchFromQueryString(location.search);

  if (query !== searchQuery) {
    history.push({
      ...location,
      pathname: APP_PATHS.SEARCH,
      search: createSearchQueryString({ query, type }),
    });
  }
};

export const search = (query, type) => async (dispatch, getState, { tmdbApi }) => {
  dispatch(searchRequest());
  dispatch(prepareSearch(query, type));
  try {
    // Fetch the results from tmdb
    const data = await tmdbApi.searchWithType(query, type);

    // Parse and store the data
    dispatch(searchSuccess(parseSearchData(data, type)));
  } catch (error) {
    dispatch(searchFailure());
    dispatch(addAlert('alert:api/tmdb-search-failed', 'error'));
  }
};

export const searchBySelectedPage = page => async (dispatch, getState, { tmdbApi }) => {
  dispatch(searchRequest());
  try {
    const query = getSearchQuery(getState());
    const type = getSearchType(getState());
    const data = await tmdbApi.searchWithType(query, type, page);
    dispatch(searchSuccess(parseSearchData(data, type)));
  } catch (error) {
    dispatch(searchFailure());
    dispatch(addAlert('alert:api/tmdb-search-page-failed', 'error'));
  }
};
