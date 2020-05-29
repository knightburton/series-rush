import { handleActions, createAction } from 'redux-actions';
import { createSelector } from 'reselect';
import { setAppWaiting, addAlert } from '../app';
import { getProfile } from '../auth';
import { getFirestoreOrderedData } from '../firestore';
import { MAXIMUM_NUMBER_OF_GROUPS } from '../../constants/config';

// Initial state
export const initialState = {
  selectedGroup: {
    tv: null,
    movie: null,
  },
  groupForm: false,
};

// Action types
export const COLLECTION_SELECT_GROUP = 'COLLECTION_SELECT_GROUP';
export const OPEN_GROUP_FORM = 'OPEN_GROUP_FORM';
export const CLOSE_GROUP_FORM = 'CLOSE_GROUP_FORM';

// Actions
export const collectionSelectGroup = createAction(
  COLLECTION_SELECT_GROUP,
  (type, group) => ({ type, group }),
);

export const openGroupForm = createAction(
  OPEN_GROUP_FORM,
);

export const closeGroupForm = createAction(
  CLOSE_GROUP_FORM,
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
export const getNumberOfGroupsByType = type => createSelector(
  getGroupsByType(type),
  groups => groups?.length || 0,
);
export const getIsNumberOfGroupsByTypeFull = type => createSelector(
  getNumberOfGroupsByType(type),
  numberOfGroups => numberOfGroups < MAXIMUM_NUMBER_OF_GROUPS,
);
export const getIsGroupFormOpen = state => state.collections.groupForm;

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
    [openGroupForm]: state => ({ ...state, groupForm: true }),
    [closeGroupForm]: state => ({ ...state, groupForm: false }),
  },
  initialState,
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

    dispatch(closeGroupForm());
    dispatch(addAlert('alert::add-success', 'success', { title: 'collection-group' }));
  } catch (error) {
    dispatch(addAlert('alert::add-failure', 'error', { title: 'collection-group' }));
  } finally {
    dispatch(setAppWaiting(false));
  }
};
