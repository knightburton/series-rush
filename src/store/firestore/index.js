import { createSelector } from 'reselect';
import { getPropertyByPath } from '../../utils';

// Selectors
export const getFirestore = state => state.firestore;
export const getFirestoreStatus = state => state.firestore.status;

export const getFirestoreData = state => state.firestore.data;
export const getFirestoreDataByPath = path => createSelector(
  getFirestoreData,
  data => getPropertyByPath(data, path, {}),
);

export const getFirestoreOrdered = state => state.firestore.ordered;
export const getFirestoreOrderedByPath = path => createSelector(
  getFirestoreOrdered,
  ordered => getPropertyByPath(ordered, path, []),
);
