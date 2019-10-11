import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { addAlert, setAppWaiting } from '../app';

// Initial state
export const initialState = {
  inProgress: false,
  updateInProgress: false,
  passwordInProgress: false,
};

// Action types
export const SET_AUTH_IN_PROGRESS = 'SET_AUTH_IN_PROGRESS';
export const SET_AUTH_UPDATE_IN_PROGRESS = 'SET_AUTH_UPDATE_IN_PROGRESS';
export const SET_AUTH_PASSWORD_IN_PROGRESS = 'SET_AUTH_PASSWORD_IN_PROGRESS';

// Action creators
export const setAuthInProgress = createAction(
  SET_AUTH_IN_PROGRESS,
  inProgress => inProgress
);
export const setAuthUpdateInProgress = createAction(
  SET_AUTH_UPDATE_IN_PROGRESS,
  updateInProgress => updateInProgress
);
export const setAuthPasswordInProgress = createAction(
  SET_AUTH_PASSWORD_IN_PROGRESS,
  passwordInProgress => passwordInProgress
);

// Selectors
export const getInProgress = state => state.auth.inProgress;
export const getUpdateInProgress = state => state.auth.updateInProgress;
export const getPasswordInProgress = state => state.auth.passwordInProgress;

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
    displayName: profile.displayName || auth.displayName || '',
    email: profile.email || auth.email || '',
    emailVerified: auth.emailVerified || false,
    photoURL: profile.photoURL || auth.photoURL || '',
    photoName: profile.photoName || '',
    lastLoginAt: auth.lastLoginAt || null,
    createdAt: auth.createdAt || null,
  })
);

// Reducer
export const reducer = handleActions(
  {
    [setAuthInProgress]: (state, { payload: inProgress }) => ({ ...state, inProgress }),
    [setAuthUpdateInProgress]: (state, { payload: updateInProgress }) => ({ ...state, updateInProgress }),
    [setAuthPasswordInProgress]: (state, { payload: passwordInProgress }) => ({ ...state, passwordInProgress }),
  },
  initialState
);

// Async actions
export const handleAuthError = error => dispatch => {
  const message = error && error.code && error.code.startsWith('auth/')
    ? `alert:${error.code}`
    : error.message;

  dispatch(addAlert(message, 'error'));
};

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
    dispatch(handleAuthError(error));
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
    dispatch(handleAuthError(error));
  } finally {
    dispatch(setAuthInProgress(false));
  }
};

export const signOut = () => async (dispatch, getState, { getFirebase, history }) => {
  dispatch(setAuthInProgress(true));
  try {
    const firebase = getFirebase();
    await firebase.logout();
    history.push('/');
  } catch (error) {
    dispatch(handleAuthError(error));
  } finally {
    dispatch(setAuthInProgress(false));
  }
};

export const sendPasswordResetEmail = (email, fromProfile = false) => async (dispatch, getState, { getFirebase }) => {
  if (fromProfile) dispatch(setAuthPasswordInProgress(true));
  else dispatch(setAuthInProgress(true));

  try {
    const firebase = getFirebase();
    const { id, email: profileEmail } = getProfile(getState());
    const address = fromProfile && !email && !!id ? profileEmail : email;
    await firebase.auth().sendPasswordResetEmail(address);
    dispatch(addAlert('alert:auth/password-reset-email-success', 'success'));
  } catch (error) {
    dispatch(handleAuthError(error));
  } finally {
    if (fromProfile) dispatch(setAuthPasswordInProgress(false));
    else dispatch(setAuthInProgress(false));
  }
};

export const updateName = (key, value) => async (dispatch, getState, { getFirebase }) => {
  dispatch(setAuthUpdateInProgress(true));
  try {
    const firebase = getFirebase();
    const { firstName, lastName } = getProfile(getState());
    const displayName = key === 'firstName'
      ? `${value} ${lastName}`
      : `${firstName} ${value}`;
    await firebase.updateAuth(
      {
        displayName,
        [key]: value,
      },
      true
    );
  } catch (error) {
    dispatch(handleAuthError(error));
  } finally {
    dispatch(setAuthUpdateInProgress(false));
  }
};

export const updateEmail = email => async (dispatch, getState, { getFirebase }) => {
  dispatch(setAuthUpdateInProgress(true));
  try {
    const firebase = getFirebase();
    await firebase.updateEmail(
      email,
      true
    );
  } catch (error) {
    dispatch(handleAuthError(error));
  } finally {
    dispatch(setAuthUpdateInProgress(false));
  }
};

export const uploadProfilePhoto = file => async (dispatch, getState, { getFirebase }) => {
  if (file) {
    dispatch(setAuthUpdateInProgress(true));
    try {
      const firebase = getFirebase();
      const { id } = getProfile(getState());
      const { uploadTaskSnapshot: { metadata } } = await firebase.uploadFile(`profiles/${id}`, file);
      const downloadUrl = await firebase.storage().ref().child(metadata.fullPath).getDownloadURL();
      await firebase.updateAuth(
        {
          photoURL: downloadUrl,
          photoName: metadata.name,
        },
        true
      );
    } catch (error) {
      dispatch(handleAuthError(error));
    } finally {
      dispatch(setAuthUpdateInProgress(false));
    }
  } else {
    dispatch(addAlert('alert:auth/no-photo-selected', 'error'));
  }
};

export const deleteProfilePhoto = () => async (dispatch, getState, { getFirebase }) => {
  dispatch(setAuthUpdateInProgress(true));
  try {
    const firebase = getFirebase();
    const { id, photoName } = getProfile(getState());
    if (id && photoName) {
      await firebase.deleteFile(`profiles/${id}/${photoName}`);
      await firebase.updateAuth(
        {
          photoURL: null,
          photoName: null,
        },
        true
      );
    } else {
      dispatch(addAlert('alert:auth/no-photo-selected', 'error'));
    }
  } catch (error) {
    dispatch(handleAuthError(error));
  } finally {
    dispatch(setAuthUpdateInProgress(false));
  }
};

export const changePassword = passwords => async (dispatch, getState, { getFirebase }) => {
  dispatch(setAuthPasswordInProgress(true));
  try {
    const firebase = getFirebase();
    const { currentPassword, newPassword, confirmPassword } = passwords;
    if (!currentPassword) throw new Error('alert:auth/password-required');
    if (newPassword !== confirmPassword) throw new Error('alert:auth/password-match');

    const { email } = getProfile(getState());
    // Before update user's password we should reautheticate the user.
    // Just simply login with the normal credentials insted of reloadAuth or reauthenticateWithCredential.
    // With this scenario the user has to remember their password.
    await firebase.login({ email, password: currentPassword });
    await firebase.auth().currentUser.updatePassword(newPassword);
    dispatch(addAlert('alert:auth/password-change-success', 'success'));
  } catch (error) {
    dispatch(handleAuthError(error));
  } finally {
    dispatch(setAuthPasswordInProgress(false));
  }
};

export const requestEmailVerification = () => async (dispatch, getState, { getFirebase }) => {
  dispatch(setAppWaiting(true));
  try {
    const firebase = getFirebase();
    await firebase.auth().currentUser.sendEmailVerification();
    dispatch(addAlert('alert:auth/email-verification-success', 'success'));
  } catch (error) {
    dispatch(handleAuthError(error));
  } finally {
    dispatch(setAppWaiting(false));
  }
};

export const deleteProfile = () => async (dispatch, getState, { getFirebase, getFirestore, history }) => {
  dispatch(setAppWaiting(true));
  try {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const { id, photoName } = getProfile(getState());
    if (id && photoName) await firebase.deleteFile(`profiles/${id}/${photoName}`);
    await firestore.collection('profiles').doc(id).delete();
    await firebase.auth().currentUser.delete();
    await firebase.logout();
    history.push('/');
  } catch (error) {
    dispatch(handleAuthError(error));
  } finally {
    dispatch(setAppWaiting(false));
  }
};
