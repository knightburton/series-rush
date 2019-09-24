import { createAction, handleActions } from 'redux-actions';

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
    // TODO: handle the error
  } finally {
    dispatch(setAuthInProgress(false));
  }
};
