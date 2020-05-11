import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { addAlert, getTmdbConfiguration } from '../app';
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
  SEARCH_REQUEST,
);
export const searchSuccess = createAction(
  SEARCH_SUCCESS,
  ({ numberOfPage, numberOfPages, numberOfResults, results }) => ({ numberOfPage, numberOfPages, numberOfResults, results }),
);
export const searchFailure = createAction(
  SEARCH_FAILURE,
);
export const storeSearchProps = createAction(
  STORE_SEARCH_PROPS,
  props => props,
);
export const clearSearchProps = createAction(
  CLEAR_SEARCH_PROPS,
);
export const clearSearchResults = createAction(
  CLEAR_SEARCH_RESULTS,
);

// Selectors
export const getSearchInProgress = state => state.search.searchInProgress;
export const getSearchQuery = state => state.search.query;
export const getSearchType = state => state.search.type;
export const getSearchPage = state => state.search.page;
export const getSearchProps = createSelector(
  [getSearchQuery, getSearchType, getSearchPage],
  (query, type, page) => ({ query, type, page }),
);
export const getSearchNumberOfPages = state => state.search.numberOfPages;
export const getSearchNumberOfResults = state => state.search.numberOfResults;
export const getSearchResults = state => state.search.results;

// Reducer
export const reducer = handleActions(
  {
    [searchRequest]: state => ({ ...state, searchInProgress: true }),
    [searchSuccess]: (state, { payload: { numberOfPage, numberOfPages, numberOfResults, results } }) => ({
      ...state,
      searchInProgress: false,
      numberOfPage,
      numberOfPages,
      numberOfResults,
      results,
    }),
    [searchFailure]: state => ({ ...state, searchInProgress: false }),
    [storeSearchProps]: (state, { payload: props }) => ({ ...state, ...props }),
    [clearSearchProps]: state => ({ ...state, query: '', type: '', page: null }),
    [clearSearchResults]: state => ({ ...state, result: [] }),
  },
  initialState,
);

// Thunk actions
export const prepareSearch = props => (dispatch, getState, { history }) => {
  const { location } = history;
  const queryString = getSearchFromQueryString(location.search, { parseNumbers: true });
  const validProps = {
    ...queryString, // That is important to get the query first
    ...props, // Then overrides the data with the new values from the current search props
    page: Object.keys(props).length && !!queryString.page && queryString.page !== props.page ? props.page : props.page || queryString.page,
  };
  const newQueryString = createSearchQueryString(validProps);

  if (location.pathname !== APP_PATHS.SEARCH.path || newQueryString !== location.search.replace(/^\?/g, '')) {
    history.push({
      ...location,
      pathname: APP_PATHS.SEARCH.path,
      search: newQueryString,
    });
  }

  dispatch(storeSearchProps(validProps));
  return validProps;
};

export const search = (props = {}) => async (dispatch, getState, { tmdbApi }) => {
  dispatch(searchRequest());
  const { query, type, page } = dispatch(prepareSearch(props));
  const tmdbConfiguration = getTmdbConfiguration(getState());

  if (!query) {
    dispatch(searchFailure());
    dispatch(addAlert('alert::api/tmdb-search-without-query-info', 'info'));
    return;
  }

  try {
    const data = await tmdbApi.searchWithType(query, type, page);
    dispatch(searchSuccess(parseSearchData(data, type, tmdbConfiguration)));
  } catch (error) {
    dispatch(searchFailure());
    dispatch(addAlert('alert::api/tmdb-search-failed', 'error'));
  }
};

export const checkSearch = () => (dispatch, getState, { history }) => {
  const { location } = history;
  const props = getSearchProps(getState());
  const stateQueryString = createSearchQueryString(props);
  const locationQuryString = location.search.replace(/^\?/g, '');

  if (stateQueryString !== locationQuryString) dispatch(search());
};
