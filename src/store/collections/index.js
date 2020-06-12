import { handleActions, createAction } from 'redux-actions';
import { createSelector } from 'reselect';
import { setAppWaiting, addAlert } from '../app';
import { getProfileID } from '../auth';
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
export const getGroupsByTypeExceptID = (type, id) => createSelector(
  getGroupsByType(type),
  groups => groups.filter(group => group.id !== id),
);
export const getCollectionByType = type => createSelector(
  getFirestoreOrderedData,
  data => data?.[`${type}Collection`] || [],
);
export const getCollectionByTypeAndGroup = (type, group) => createSelector(
  getCollectionByType(type),
  collection => collection.filter(item => item.groupID === group),
);
export const getNumberOfGroupsByType = type => createSelector(
  getGroupsByType(type),
  groups => groups?.length || 0,
);
export const getNumberOfItemsByTypeAndGroup = (type, group) => createSelector(
  getCollectionByTypeAndGroup(type, group),
  collection => collection.length || 0,
);
export const getIsGroupAddEnabled = type => createSelector(
  getNumberOfGroupsByType(type),
  numberOfGroups => numberOfGroups > 0 && numberOfGroups < MAXIMUM_NUMBER_OF_GROUPS,
);
export const getIsGroupDeleteEnabled = type => createSelector(
  getNumberOfGroupsByType(type),
  numberOfGroups => numberOfGroups > 1,
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
export const addCollectionItem = (id, type, group) => async (dispatch, getState, { getFirestore }) => {
  dispatch(setAppWaiting(true));
  try {
    const firestore = getFirestore();
    const profileID = getProfileID(getState());

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

export const removeCollectionItem = () => async (dispatch, getState, { getFirestore }) => {
  dispatch(setAppWaiting(true));
  try {
    const firestore = getFirestore();
    const profileID = getProfileID(getState());
    const dialogOpen = getIsDialogOpen('deleteItem')(getState());
    const dialogData = getDialogData(getState());

    if (!dialogOpen || !dialogData?.id) throw new Error('missingData');

    await firestore.delete({
      collection: 'profiles',
      doc: profileID,
      subcollections: [{
        collection: 'collection',
        doc: `${dialogData.id}`,
      }],
    });

    dispatch(closeCollectionsDialog());
    dispatch(setCollectionsDialogData(null));
    dispatch(addAlert('alert::delete-success', 'success', { title: 'collections' }));
  } catch (error) {
    if (error?.message === 'missingData') dispatch(addAlert('alert::missingCollectionData', 'error'));
    else dispatch(addAlert('alert::delete-failure', 'error', { title: 'collections' }));
  } finally {
    dispatch(setAppWaiting(false));
  }
};

export const addCollectionGroup = (details, type) => async (dispatch, getState, { getFirestore }) => {
  dispatch(setCollectionsProgress(true));
  try {
    const firestore = getFirestore();
    const profileID = getProfileID(getState());

    await firestore.add({
      collection: 'profiles',
      doc: profileID,
      subcollections: [{
        collection: 'groups',
      }],
    }, {
      ...details,
      type,
      createdAt: firestore.FieldValue.serverTimestamp(),
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
    const profileID = getProfileID(getState());

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

export const deleteCollectionGroup = () => async (dispatch, getState, { getFirestore }) => {
  dispatch(setCollectionsProgress(true));
  try {
    const firestore = getFirestore();
    const profileID = getProfileID(getState());
    const dialogOpen = getIsDialogOpen('deleteGroup')(getState());
    const dialogData = getDialogData(getState());

    if (!dialogOpen || !dialogData?.id) throw new Error('missingData');
    await firestore.delete({
      collection: 'profiles',
      doc: profileID,
      subcollections: [{
        collection: 'groups',
        doc: `${dialogData.id}`,
      }],
    });

    dispatch(closeCollectionsDialog());
    dispatch(setCollectionsDialogData(null));
    dispatch(addAlert('alert::delete-success', 'success', { title: 'collection-group' }));
  } catch (error) {
    if (error?.message === 'missingData') dispatch(addAlert('alert::missingCollectionData', 'error'));
    else dispatch(addAlert('alert::delete-failure', 'error', { title: 'collection-group' }));
  } finally {
    dispatch(setCollectionsProgress(false));
  }
};

export const deleteCollectionGroupItems = () => async (dispatch, getState, { getFirestore }) => {
  dispatch(setCollectionsProgress(false));
  try {
    const firestore = getFirestore();
    const profileID = getProfileID(getState());
    const dialogOpen = getIsDialogOpen('deleteGroupItems')(getState());
    const dialogData = getDialogData(getState());

    if (!dialogOpen || !dialogData?.id || !dialogData?.type) throw new Error('missingData');

    const items = getCollectionByTypeAndGroup(dialogData.type, dialogData.id)(getState());
    // Init the original firestore batch.
    const batch = firestore.batch();
    // Use the original firestore path to add each item id to the batch for delete.
    items.forEach(item => {
      const itemRef = firestore.collection('profiles').doc(profileID).collection('collection').doc(item.id);
      batch.delete(itemRef);
    });
    // Finish the batch delete.
    await batch.commit();

    dispatch(closeCollectionsDialog());
    dispatch(setCollectionsDialogData(null));
  } catch (error) {
    if (error?.message === 'missingData') dispatch(addAlert('alert::missingCollectionData', 'error'));
    else dispatch(addAlert('alert::delete-failure', 'error', { title: 'collection-group-items' }));
  } finally {
    dispatch(setCollectionsProgress(false));
  }
};

export const moveCollectionGroupItems = () => async (dispatch, getState, { getFirestore }) => {
  dispatch(setCollectionsProgress(false));
  try {
    const firestore = getFirestore();
    const profileID = getProfileID(getState());
    const dialogOpen = getIsDialogOpen('moveGroupItems')(getState());
    const dialogData = getDialogData(getState());

    if (!dialogOpen || !dialogData?.targetGroupID || !dialogData?.id || !dialogData?.type) throw new Error('missingData');

    const items = getCollectionByTypeAndGroup(dialogData.type, dialogData.id)(getState());
    // Init the original firestoe batch.
    const batch = firestore.batch();
    // Use the original firestore path to add each item to the batch for update.
    items.forEach(item => {
      const itemRef = firestore.collection('profiles').doc(profileID).collection('collection').doc(item.id);
      batch.update(itemRef, { groupID: dialogData.targetGroupID });
    });
    // Finish the batch update.
    await batch.commit();

    dispatch(closeCollectionsDialog());
    dispatch(setCollectionsDialogData(null));
  } catch (error) {
    if (error?.message === 'missingData') dispatch(addAlert('alert::missingCollectionData', 'error'));
    else dispatch(addAlert('alert::delete-failure', 'error', { title: 'collection-group-items' }));
  } finally {
    dispatch(setCollectionsProgress(false));
  }
};
