import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { addAlert, getTmdbConfiguration } from '../app';
import { parseSearchData } from '../../utils/parser';
import {
  getSearchFromQueryString,
  createSearchQueryString,
} from '../../utils/query';
import { APP_PATHS } from '../../constants/paths';

// Initial state
export const initialState = {
  inProgress: false,
  queryInProgress: false,
  query: '',
  type: '',
  page: null,
  numberOfPages: null,
  numberOfResults: null,
  results: [],
  resultDetails: {},
};

// Action types
export const SET_SEARCH_IN_PROGRESS = 'SET_SEARCH_IN_PROGRESS';
export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';
export const STORE_SEARCH_PROPS = 'STORE_SEARCH_PROPS';
export const CLEAR_SEARCH_PROPS = 'CLEAR_SEARCH_PROPS';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
export const SET_SEARCH_RESULT_DETAILS = 'SET_SEARCH_RESULT_DETAILS';
export const CLEAR_SEARCH_STORE = 'CLEAR_SEARCH_STORE';

// Action creators
export const setSearchInProgress = createAction(
  SET_SEARCH_IN_PROGRESS,
  inProgress => inProgress,
);
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
export const setSearchResultDetails = createAction(
  SET_SEARCH_RESULT_DETAILS,
  (id, details) => ({ id, details }),
);
export const clearSearchStore = createAction(
  CLEAR_SEARCH_STORE,
);

// Selectors
export const getSearchInProgress = state => state.search.inProgress;
export const getSearchQueryInProgress = state => state.search.queryInProgress;
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
export const getSearchResultDetails = state => state.search.resultDetails;
export const getSearchResultDetailsByID = id => createSelector(
  getSearchResultDetails,
  details => details?.[id],
);

// Reducer
export const reducer = handleActions(
  {
    [setSearchInProgress]: (state, { payload: inProgress }) => ({ ...state, inProgress }),
    [searchRequest]: state => ({ ...state, queryInProgress: true }),
    [searchSuccess]: (state, { payload: { numberOfPage, numberOfPages, numberOfResults, results } }) => ({
      ...state,
      queryInProgress: false,
      numberOfPage,
      numberOfPages,
      numberOfResults,
      results,
    }),
    [searchFailure]: state => ({ ...state, queryInProgress: false }),
    [storeSearchProps]: (state, { payload: props }) => ({ ...state, ...props }),
    [clearSearchProps]: state => ({ ...state, query: '', type: '', page: null }),
    [clearSearchResults]: state => ({ ...state, result: [] }),
    [setSearchResultDetails]: (state, { payload: { id, details } }) => ({
      ...state,
      resultDetails: {
        ...state.resultDetails,
        [id]: details,
      },
    }),
    [clearSearchStore]: () => initialState,
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

export const fetchResultDetails = (type, id) => async (dispatch, getState, { tmdbApi }) => {
  dispatch(setSearchInProgress(true));

  try {
    const storedDetails = getSearchResultDetailsByID(id)(getState());
    if (!storedDetails) {
      const details = await tmdbApi.getDetails(type, id);
      dispatch(setSearchResultDetails(id, details));
    }
  } catch (error) {
    dispatch(addAlert('alert::api/tmdb-details-failed', 'error'));
  } finally {
    dispatch(setSearchInProgress(false));
  }
};
