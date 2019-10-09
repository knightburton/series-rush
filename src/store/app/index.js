import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { getTimestamp } from '../../utils';

// Initial state
export const initialState = {
  alerts: [],
  waiting: 0,
  isMobileDrawerOpened: false,
};

// Action types
export const ADD_ALERT = 'ADD_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const SET_APP_WAITING = 'SET_APP_WAITING';
export const TOGGLE_MOBILE_DRAWER = 'TOGGLE_MOBILE_DRAWER';

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
  },
  initialState
);
