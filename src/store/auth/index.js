import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { addAlert } from '../app';

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
export const getFirebaseAuthIsLoaded = createSelector(
  getFirebaseAuth,
  auth => auth && auth.isLoaded
);
export const getFirebaseAuthIsEmpty = createSelector(
  getFirebaseAuth,
  auth => auth && auth.isEmpty
);
export const getIsSignedIn = createSelector(
  [getFirebaseAuthIsLoaded, getFirebaseAuthIsEmpty, getFirebaseAuth],
  (isLoaded, isEmpty, auth) => isLoaded && !isEmpty && auth && !!auth.uid
);
export const getProfile = createSelector(
  [getIsSignedIn, getFirebaseAuth, getFirebaseProfile],
  (isSignedIn, auth, profile) => ({
    signedIn: isSignedIn,
    id: auth.uid || null,
    firstName: profile.firstName || '',
    lastName: profile.lastName || '',
    displayName: profile.displayName || auth.displayName || null,
    email: profile.email || auth.email || null,
    emailVerified: auth.emailVerified || false,
    photoURL: profile.photoURL || auth.photoURL,
    photoName: profile.photoName || null,
    lastLoginAt: auth.lastLoginAt || null,
    createdAt: auth.createdAt || null,
  })
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
    dispatch(addAlert(error.message, 'error'));
  } finally {
    dispatch(setAuthInProgress(false));
  }
};

export const signIn = credentials => async (dispatch, getState, { getFirebase }) => {
  dispatch(setAuthInProgress(true));
  try {
    const firebase = getFirebase();
    await firebase.login(credentials);
  } catch (error) {
    dispatch(addAlert(error.message, 'error'));
  } finally {
    dispatch(setAuthInProgress(false));
  }
};

export const signOut = () => async (dispatch, getState, { getFirebase }) => {
  dispatch(setAuthInProgress(true));
  try {
    const firebase = getFirebase();
    await firebase.logout();
  } catch (error) {
    dispatch(addAlert(error.message, 'error'));
  } finally {
    dispatch(setAuthInProgress(false));
  }
};

export const sendPasswordResetEmail = email => async (dispatch, getState, { getFirebase }) => {
  dispatch(setAuthInProgress(true));
  try {
    const firebase = getFirebase();
    await firebase.auth().sendPasswordResetEmail(email);
  } catch (error) {
    dispatch(addAlert(error.message, 'error'));
  } finally {
    dispatch(setAuthInProgress(false));
  }
};

export const updateEmail = email => async (dispatch, getState, { getFirebase }) => {
  try {
    const firebase = getFirebase();
    await firebase.updateEmail(email, true);
  } catch (error) {
    dispatch(addAlert(error.message, 'error'));
  }
};
