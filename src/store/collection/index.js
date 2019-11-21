import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { setAppWaiting, addAlert } from '../app';
import { getProfile } from '../auth';
import { getFirestoreDataByPath } from '../firestore';
import { getCollectionGroupsQuery } from '../../utils';

// Initial state
export const initialState = {};

// Reducer
export const reducer = handleActions(
  {},
  initialState,
);

// Selectors
export const getGroupsByType = type => createSelector(
  getFirestoreDataByPath(`groups.${type}`),
  groups => Object.keys(groups).reduce((a, group) => {
    if (groups[group]) return [...a, { key: group, label: groups[group] }];
    return a;
  }, []),
);

// Async actions
export const fetchCollectionGroups = () => async (dispatch, getState, { getFirestore }) => {
  try {
    const firestore = getFirestore();
    const { id } = getProfile(getState());
    await firestore.get(getCollectionGroupsQuery(id));
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
