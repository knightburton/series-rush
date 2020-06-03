import { handleActions, createAction } from 'redux-actions';
import { createSelector } from 'reselect';
import { setAppWaiting, addAlert } from '../app';
import { getProfile } from '../auth';
import { getFirestoreOrderedData } from '../firestore';
import { MAXIMUM_NUMBER_OF_GROUPS } from '../../constants/config';

// Initial state
export const initialState = {
  inProgress: false,
  selectedGroup: {
    tv: null,
    movie: null,
  },
  dialogOpen: '',
  dialogData: null,
};

// Action types
export const SET_COLLECTIONS_PROGRESS = 'SET_COLLECTIONS_PROGRESS';
export const COLLECTION_SELECT_GROUP = 'COLLECTION_SELECT_GROUP';
export const OPEN_COLLECTIONS_DIALOG = 'OPEN_COLLECTIONS_DIALOG';
export const CLOSE_COLLECTIONS_DIALOG = 'CLOSE_COLLECTIONS_DIALOG';
export const SET_COLLECTIONS_DIALOG_DATA = 'SET_COLLECTIONS_DIALOG_DATA';

// Actions
export const setCollectionsProgress = createAction(
  SET_COLLECTIONS_PROGRESS,
  inProgress => inProgress,
);

export const collectionSelectGroup = createAction(
  COLLECTION_SELECT_GROUP,
  (type, group) => ({ type, group }),
);

export const openCollectionsDialog = createAction(
  OPEN_COLLECTIONS_DIALOG,
  type => type,
);

export const closeCollectionsDialog = createAction(
  CLOSE_COLLECTIONS_DIALOG,
);

export const setCollectionsDialogData = createAction(
  SET_COLLECTIONS_DIALOG_DATA,
  dialogData => dialogData,
);

// Selectors
export const getCollectionInProgress = state => state.collections.inProgress;
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
  numberOfGroups => numberOfGroups === MAXIMUM_NUMBER_OF_GROUPS,
);
export const getDialogOpen = state => state.collections.dialogOpen;
export const getIsDialogOpen = type => createSelector(
  getDialogOpen,
  dialogOpen => dialogOpen === type,
);
export const getDialogData = state => state.collections.dialogData;

// Reducer
export const reducer = handleActions(
  {
    [setCollectionsProgress]: (state, { payload: inProgress }) => ({ ...state, inProgress }),
    [collectionSelectGroup]: (state, { payload: { type, group } }) => ({
      ...state,
      selectedGroup: {
        ...state.selectedGroup,
        [type]: group,
      },
    }),
    [openCollectionsDialog]: (state, { payload: type }) => ({ ...state, dialogOpen: type }),
    [closeCollectionsDialog]: state => ({ ...state, dialogOpen: '' }),
    [setCollectionsDialogData]: (state, { payload: dialogData }) => ({ ...state, dialogData }),
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

export const addNewCollectionGroup = (details, type) => async (dispatch, getState, { getFirestore }) => {
  dispatch(setCollectionsProgress(true));
  try {
    const firestore = getFirestore();
    const { id: profileID } = getProfile(getState());
    const highestGroupOrderByType = getHighestGroupOrderByType(type)(getState());

    await firestore.add({
      collection: 'profiles',
      doc: profileID,
      subcollections: [{
        collection: 'groups',
      }],
    }, {
      ...details,
      type,
      order: highestGroupOrderByType + 1,
    });

    dispatch(closeCollectionsDialog());
    dispatch(addAlert('alert::add-success', 'success', { title: 'collection-group' }));
  } catch (error) {
    dispatch(addAlert('alert::add-failure', 'error', { title: 'collection-group' }));
  } finally {
    dispatch(setCollectionsProgress(false));
  }
};

export const updateCollectionGroup = (id, details) => async (dispatch, getState, { getFirestore }) => {
  dispatch(setCollectionsProgress(true));
  try {
    const firestore = getFirestore();
    const { id: profileID } = getProfile(getState());

    await firestore.update({
      collection: 'profiles',
      doc: profileID,
      subcollections: [{
        collection: 'groups',
        doc: `${id}`,
      }],
    }, details);

    dispatch(closeCollectionsDialog());
    dispatch(setCollectionsDialogData(null));
    dispatch(addAlert('alert::update-success', 'success', { title: 'collection-group' }));
  } catch (error) {
    dispatch(addAlert('alert::update-failure', 'error', { title: 'collection-group' }));
  } finally {
    dispatch(setCollectionsProgress(false));
  }
};
