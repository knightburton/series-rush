import { createAction, handleActions } from 'redux-actions';
import { setAppWaiting, addAlert } from '../app';
import { getProfile } from '../auth';

// Initial state
export const initialState = {
  list: [],
};

// Action types
export const ADD_TO_COLLECTION_REQUEST = 'ADD_TO_COLLECTION_REQUEST';
export const ADD_TO_COLLECTION_SUCCESS = 'ADD_TO_COLLECTION_SUCCESS';
export const ADD_TO_COLLECTION_FAILURE = 'ADD_TO_COLLECTION_FAILURE';

// Action creators
export const addToCollectionRequest = createAction(
  ADD_TO_COLLECTION_REQUEST
);
export const addToCollectionSuccess = createAction(
  ADD_TO_COLLECTION_SUCCESS,
  id => id
);
export const addToCollectionFailure = createAction(
  ADD_TO_COLLECTION_FAILURE
);

// Reducer
export const reducer = handleActions(
  {},
  initialState
);

// Async actions
export const addToCollection = showID => async (dispatch, getState, { getFirestore }) => {
  dispatch(setAppWaiting(true));
  try {
    const firestore = getFirestore();
    const { id } = getProfile(getState());
    await firestore.collection('collections').doc(id).add({
      showID,
    });
  } catch (error) {
    dispatch(addAlert(error.message, 'error'));
  } finally {
    dispatch(setAppWaiting(false));
  }
};
