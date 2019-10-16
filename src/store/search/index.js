import { createAction, handleActions } from 'redux-actions';
import { addAlert } from '../app';
import {
  createSearchQueryString,
  parseSearchData,
} from '../../utils';
import { APP_PATHS } from '../../constants/paths';

// Initial state
export const initialState = {
  searchInProgress: false,
  query: '',
  page: null,
  numberOfPages: null,
  numberOfResults: null,
  results: [],
};

// Action types
export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';
export const STORE_SEARCH_QUERY = 'STORE_SEARCH_QUERY';
export const CLEAR_SEARCH_QUERY = 'CLEAR_SEARCH_QUERY';
export const CLEAR_SEARCH_RESULT = 'CLEAR_SEARCH_RESULT';

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
export const storeSearchQuery = createAction(
  STORE_SEARCH_QUERY,
  query => query
);
export const clearSearchQuery = createAction(
  CLEAR_SEARCH_QUERY
);
export const clearSearchResult = createAction(
  CLEAR_SEARCH_RESULT
);

// Selectors
export const getSearchInProgress = state => state.search.searchInProgress;
export const getSearchQuery = state => state.search.query;
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
    [storeSearchQuery]: (state, { payload: query }) => ({ ...state, query }),
    [clearSearchQuery]: state => ({ ...state, query: '' }),
    [clearSearchResult]: state => ({ ...state, result: [] }),
  },
  initialState
);

// Thunk actions
export const prepareSearch = (query, type) => (dispatch, getState, { history }) => {
  dispatch(storeSearchQuery(query));

  const { location } = history;

  history.push({
    ...location,
    pathname: APP_PATHS.SEARCH,
    search: createSearchQueryString({ query, type }),
  });
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
    dispatch(addAlert('alert:api/tvmaze-search-show', 'error'));
  }
};
