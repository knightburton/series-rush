import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

// Initial state
export const initialState = {
  inProgress: false,
};

// Action types
export const SET_AUTH_IN_PROGRESS = 'SET_AUTH_IN_PROGRESS';

// Action creators
export const setAuthInProgress = createAction(
  SET_AUTH_IN_PROGRESS,
  inProgress => inProgress
);

// Selectors
export const getInProgress = state => state.auth.inProgress;

export const getFirebaseProfile = state => state.firebase.profile;
export const getFirebaseAuth = state => state.firebase.auth;
export const getFirebaseAuthError = state => state.firebase.authError;
export const getFirebaseAuthErrorMessage = createSelector(
  getFirebaseAuthError,
  authError => (authError && authError.message) || null
);

// Reducer
export const reducer = handleActions(
  {
    [setAuthInProgress]: (state, { payload: inProgress }) => ({ ...state, inProgress }),
  },
  initialState
);

// Async actions
export const createProfile = credentials => async (dispatch, getState, { getFirebase }) => {
  dispatch(setAuthInProgress(true));
  try {
    const firebase = getFirebase();
    const { firstName, lastName, email, password } = credentials;

    await firebase.createUser(
      { email, password },
      { firstName, lastName }
    );
    await firebase.updateAuth(
      { displayName: `${firstName} ${lastName}` },
      true // Also update the Profile document
    );
  } catch (error) {
    // Handled by react-redux-firebase
  } finally {
    dispatch(setAuthInProgress(false));
  }
};
