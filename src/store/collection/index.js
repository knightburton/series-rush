import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { setAppWaiting, addAlert } from '../app';
import { getProfile } from '../auth';
import { getFirestoreOrderedByCollection } from '../firestore';
import { SEARCH_TYPES } from '../../constants/config';

// Initial state
export const initialState = {};

// Reducer
export const reducer = handleActions(
  {},
  initialState,
);

// Selectors
export const getTVGroups = createSelector(
  getFirestoreOrderedByCollection('groups'),
  groups => groups && groups.length && groups.find(group => group.type === SEARCH_TYPES.TV),
);
export const getMovieGroups = createSelector(
  getFirestoreOrderedByCollection('movie'),
  groups => groups && groups.length && groups.find(group => group.type === SEARCH_TYPES.MOVIE),
);

// Async actions
export const fetchCollectionGroups = () => async (dispatch, getState, { getFirestore }) => {
  try {
    const firestore = getFirestore();
    const { id } = getProfile(getState());
    await firestore.get({
      collection: 'collections',
      doc: id,
      subcollections: [
        { collection: 'groups' },
      ],
      storeAs: 'groups',
    });
  } catch (error) {
    dispatch(addAlert('alert:collection/fetch-collection-group-failure', 'error'));
  }
};

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
      },
    );

    dispatch(addAlert('alert:collection/add-to-collection-success', 'success'));
  } catch (error) {
    dispatch(addAlert('alert:collection/add-to-collection-failure', 'error'));
  } finally {
    dispatch(setAppWaiting(false));
  }
};
