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
export const getSelectedGroup = state => state.collections.selectedGroup;
export const getSelectedGroupTv = state => state.collections.selectedGroup.tv;
export const getSelectedGroupMovie = state => state.collections.selectedGroup.movie;
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
export const getHighestGroupOrderByType = type => createSelector(
  getGroupsByType(type),
  groups => Math.max(...groups.map(group => group?.order), 0),
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

    dispatch(addAlert('alert::add-success', 'success', { title: 'collections' }));
  } catch (error) {
    dispatch(addAlert('alert::add-failure', 'error', { title: 'collections' }));
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

    dispatch(addAlert('alert::delete-success', 'success', { title: 'collections' }));
  } catch (error) {
    dispatch(addAlert('alert::delete-failure', 'error', { title: 'collections' }));
  } finally {
    dispatch(setAppWaiting(false));
  }
};

export const addNewCollectionGroup = details => async (dispatch, getState, { getFirestore }) => {
  dispatch(setAppWaiting(true));
  try {
    const firestore = getFirestore();
    const { id: profileID } = getProfile(getState());
    const highestGroupOrderByType = getHighestGroupOrderByType(details?.type)(getState());

    await firestore.add({
      collection: 'profiles',
      doc: profileID,
      subcollections: [{
        collection: 'groups',
      }],
    }, {
      ...details,
      order: highestGroupOrderByType + 1,
    });

    dispatch(addAlert('alert::add-success', 'success', { title: 'collection-group' }));
  } catch (error) {
    dispatch(addAlert('alert::add-failure', 'error', { title: 'collection-group' }));
  } finally {
    dispatch(setAppWaiting(false));
  }
};
