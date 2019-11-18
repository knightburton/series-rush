import { createSelector } from 'reselect';

// Selectors
export const getFirestore = state => state.firestore;
export const getFirestoreStatus = state => state.firestore.status;

export const getFirestoreData = state => state.firestore.data;
export const getFirestoreDataByCollection = collection => createSelector(
  getFirestoreData,
  data => (data && data[collection]) || null,
);

export const getFirestoreOrdered = state => state.firestore.ordered;
export const getFirestoreOrderedByCollection = collection => createSelector(
  getFirestoreOrdered,
  ordered => (ordered && ordered[collection]) || null,
);
