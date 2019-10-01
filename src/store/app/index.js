import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { getTimestamp } from '../../utils';

// Initial state
export const initialState = {
  alerts: [],
};

// Action types
export const ADD_ALERT = 'ADD_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

// Action creators
export const addAlert = createAction(
  ADD_ALERT,
  (message, variant) => ({ message, variant })
);
export const removeAlert = createAction(
  REMOVE_ALERT,
  key => key
);

// Selectors
export const getAlerts = state => state.app.alerts;
export const getLastAlert = createSelector(
  getAlerts,
  alerts => alerts.pop()
);

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
  },
  initialState
);
