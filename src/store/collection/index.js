import { handleActions, createAction } from 'redux-actions';
import { createSelector } from 'reselect';
import { setAppWaiting, addAlert } from '../app';
import { getProfile } from '../auth';
import { getFirestoreOrderedData } from '../firestore';

// Initial state
export const initialState = {
  selectedGroup: {
    tv: null,
    movie: null,
  },
};

// Action types
export const COLLECTION_SELECT_GROUP = 'COLLECTION_SELECT_GROUP';

// Actions
export const collectionSelectGroup = createAction(
  COLLECTION_SELECT_GROUP,
  (type, group) => ({ type, group }),
);

// Reducer
export const reducer = handleActions(
  {
    [collectionSelectGroup]: (state, { payload: { type, group } }) => ({
      ...state,
      selectedGroup: {
        ...state.selectedGroup,
        [type]: group,
      },
    }),
  },
  initialState,
);

// Selectors
export const getSelectedGroup = state => state.collection.selectedGroup;
export const getSelectedGroupTv = state => state.collection.selectedGroup.tv;
export const getSelectedGroupMovie = state => state.collection.selectedGroup.movie;
export const getSelectedGroupByType = type => createSelector(
  getSelectedGroup,
  group => group[type],
);

export const getGroupsByType = type => createSelector(
  getFirestoreOrderedData,
  data => data?.[`${type}Groups`] || [],
);

export const getCollectionByType = type => createSelector(
  getFirestoreOrderedData,
  data => data?.[`${type}Collection`] || [],
);
export const getCollectionByTypeAndGroup = (type, group) => createSelector(
  getCollectionByType(type),
  collection => collection.filter(item => item.groupID === group),
);

// Thunks
export const addToCollection = (id, type, group) => async (dispatch, getState, { getFirestore }) => {
  dispatch(setAppWaiting(true));
  try {
    const firestore = getFirestore();
    const { id: profileID } = getProfile(getState());

    await firestore.set({
      collection: 'profiles',
      doc: profileID,
      subcollections: [{
        collection: 'collection',
        doc: `${id}`,
      }],
    }, {
      type,
      groupID: group,
    });

    dispatch(addAlert('alert::add-success', 'success', { title: 'collection' }));
  } catch (error) {
    dispatch(addAlert('alert::add-failure', 'error', { title: 'collection' }));
  } finally {
    dispatch(setAppWaiting(false));
  }
};

export const removeFromCollection = id => async (dispatch, getState, { getFirestore }) => {
  dispatch(setAppWaiting(true));
  try {
    const firestore = getFirestore();
    const { id: profileID } = getProfile(getState());

    await firestore.delete({
      collection: 'profiles',
      doc: profileID,
      subcollections: [{
        collection: 'collection',
        doc: `${id}`,
      }],
    });

    dispatch(addAlert('alert::delete-success', 'success', { title: 'collection' }));
  } catch (error) {
    dispatch(addAlert('alert::delete-failure', 'error', { title: 'collection' }));
  } finally {
    dispatch(setAppWaiting(false));
  }
};
