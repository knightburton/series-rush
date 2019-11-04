import { handleActions } from 'redux-actions';
import { setAppWaiting, addAlert } from '../app';
import { getProfile } from '../auth';

// Initial state
export const initialState = {};

// Reducer
export const reducer = handleActions(
  {},
  initialState
);

// Async actions
export const addToCollection = (id, type) => async (dispatch, getState, { getFirestore }) => {
  dispatch(setAppWaiting(true));
  try {
    const firestore = getFirestore();
    const { id: profileID } = getProfile(getState());

    await firestore.add(
      {
        collection: 'collections',
        doc: profileID,
        subcollections: [{ collection: type }],
      },
      {
        id,
        group: 'default',
      }
    );

    dispatch(addAlert('alert:collection/add-to-collection-success', 'success'));
  } catch (error) {
    dispatch(addAlert('alert:collection/add-to-collection-failure', 'error'));
  } finally {
    dispatch(setAppWaiting(false));
  }
};
