import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { setAppWaiting, addAlert } from '../app';
import { getProfile } from '../auth';
import { getFirestoreOrderedByCollection } from '../firestore';
import { SEARCH_TYPES } from '../../constants/config';
import {
  getCollectionGroupsQuery,
  getPropertyByPath,
} from '../../utils';

// Initial state
export const initialState = {};

// Reducer
export const reducer = handleActions(
  {},
  initialState,
);

// Selectors
export const getAllGroupsByType = type => createSelector(
  getFirestoreOrderedByCollection(type),
  groups => groups && groups.length && getPropertyByPath(groups.find(group => group.type === SEARCH_TYPES[type]), 'items', {}),
);
export const getValidGroupsByType = type => createSelector(
  getFirestoreOrderedByCollection('groups'),
  groups => {
    const items = groups && groups.length && getPropertyByPath(groups.find(group => group.type === type), 'items', {});
    const validItems = items && Object.keys(items).reduce((a, i) => (items[i] ? [...a, { key: i, label: items[i] }] : a), []);
    return validItems || [];
  },
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
