import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import {
  getTimestamp,
  parseTmdbConfiguration,
  getDayDifferenceLessThan,
} from '../../utils';

// Initial state
export const initialState = {
  alerts: [],
  waiting: 0,
  isMobileDrawerOpened: false,
  tmdbConfiguration: null,
};

// Action types
export const ADD_ALERT = 'ADD_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const SET_APP_WAITING = 'SET_APP_WAITING';
export const TOGGLE_MOBILE_DRAWER = 'TOGGLE_MOBILE_DRAWER';

export const TMDB_CONFIGURATON_START = 'TMDB_CONFIGURATON_START';
export const TMDB_CONFIGURATON_FINISH = 'TMDB_CONFIGURATON_FINISH';

// Action creators
export const addAlert = createAction(
  ADD_ALERT,
  (message, variant) => ({ message, variant })
);
export const removeAlert = createAction(
  REMOVE_ALERT,
  key => key
);
export const setAppWaiting = createAction(
  SET_APP_WAITING,
  isWaiting => isWaiting
);
export const toggleMobileDrawer = createAction(
  TOGGLE_MOBILE_DRAWER
);
export const tmdbConfigurationStart = createAction(
  TMDB_CONFIGURATON_START
);
export const tmdbConfigurationFinish = createAction(
  TMDB_CONFIGURATON_FINISH,
  tmdbConfiguration => tmdbConfiguration
);

// Selectors
export const getAlerts = state => state.app.alerts;
export const getLastAlert = createSelector(
  getAlerts,
  alerts => alerts.pop()
);
export const getWaiting = state => state.app.waiting;
export const getIsAppWaiting = createSelector(
  getWaiting,
  waiting => waiting > 0
);
export const getIsMobileDrawerOpened = state => state.app.isMobileDrawerOpened;
export const getTmdbConfiguration = state => state.app.tmdbConfiguration;

// Reducer
export const reducer = handleActions(
  {
    [addAlert]: (state, { payload: { message, variant = 'info' } }) => ({
      ...state,
      alerts: [
        ...state.alerts,
        { key: getTimestamp(), message, variant },
      ],
    }),
    [removeAlert]: (state, { payload: key }) => ({
      ...state,
      alerts: state.alerts.filter(alert => alert.key !== key),
    }),
    [setAppWaiting]: (state, { payload: isWaiting }) => ({
      ...state,
      waiting: isWaiting ? state.waiting + 1 : state.waiting - 1,
    }),
    [toggleMobileDrawer]: state => ({ ...state, isMobileDrawerOpened: !state.isMobileDrawerOpened }),
    [tmdbConfigurationFinish]: (state, { payload: tmdbConfiguration }) => ({ ...state, tmdbConfiguration }),
  },
  initialState
);

// Thunk actions
export const requestTmdbConfiguration = () => async (dispatch, getState, { storage, tmdbApi }) => {
  dispatch(tmdbConfigurationStart());
  const storedConfiguration = storage.get('TMDB_CONFIGURATION');

  if (storedConfiguration && getDayDifferenceLessThan(storedConfiguration.lastUpdate, 3)) {
    dispatch(tmdbConfigurationFinish(storedConfiguration));
  } else {
    try {
      const rawConfiguration = await tmdbApi.getConfiguration();
      const configuration = parseTmdbConfiguration(rawConfiguration);
      storage.set('TMDB_CONFIGURATION', {
        ...configuration,
        lastUpdate: getTimestamp(),
      });
      dispatch(tmdbConfigurationFinish(configuration));
    } catch (error) {
      dispatch(tmdbConfigurationFinish(null));
    }
  }
};
