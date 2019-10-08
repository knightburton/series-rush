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
export const addToSeriesCollection = showID => async (dispatch, getState, { getFirestore }) => {
  dispatch(setAppWaiting(true));
  try {
    const firestore = getFirestore();
    const { id } = getProfile(getState());
    await firestore.add(
      {
        collection: 'collections',
        doc: id,
        subcollections: [{ collection: 'series' }],
      },
      {
        showID,
        group: 'default',
      }
    );
    dispatch(addAlert('alert:collection/add-to-series-success', 'success'));
  } catch (error) {
    dispatch(addAlert('alert:collection/add-to-series-failure', 'error'));
  } finally {
    dispatch(setAppWaiting(false));
  }
};
