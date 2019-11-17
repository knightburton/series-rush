const functions = require('firebase-functions');
const admin = require('firebase-admin');
const uuid = require('uuid').v4;
const {
  NUMBER_OF_GROUPS,
  GROUP_TYPES,
} = require('../constants');

/**
 * Creates the default group object with the number of gourps constants.
 */
const createGroupItems = () => [...Array(NUMBER_OF_GROUPS).keys()].reduce((o, index) => ({
  ...o,
  [uuid()]: index === 0 ? 'Default' : '',
}), {});

/**
 * Deletes every data that relates to the actual user.
 *
 * 1. Deletes the profile photo if present from storage.
 * 2. Deletes the profile document from firestore.
 */
const userCleanup = functions.auth.user().onDelete(async user => {
  const bucket = admin.storage().bucket();
  const { uid } = user;

  console.log('[userCleanup]: User ID: ', uid);

  try {
    const firestoreDoc = admin.firestore().collection('profiles').doc(uid);
    const queryDocumentSnapshot = await firestoreDoc.get();
    const photoName = queryDocumentSnapshot.get('photoName');

    if (photoName) {
      console.log('[userCleanup]: Cleanup profile photo...');
      const userProfilePhotoPath = `profiles/${uid}/${photoName}`;
      await bucket.file(userProfilePhotoPath).delete();
    }

    console.log('[userCleanup]: Cleanup profile data...');
    await firestoreDoc.delete();

  } catch (error) {
    console.error('[userCleanup]: Failed with error: ', error);
  }
});

/**
 * Creates the new fixed length tv and movi groups for the new user.
 */
const userCreate = functions.auth.user().onCreate(async user => {
  const { firstName, lastName, uid } = user;

  console.log('[userCreate]: User ID: ', uid);

  try {
    console.log('[userCreate]: Create the default tv groups for the new user...');
    const tvGroupItems = createGroupItems();
    await admin.firestore().collection('collections').doc(uid).collection('groups').add({
      type: GROUP_TYPES.TV,
      items: tvGroupItems,
    });

    console.log('[userCreate]: Create the default movie groups for the new user...');
    const movieGroupItems = createGroupItems();
    await admin.firestore().collection('collections').doc(uid).collection('groups').add({
      type: GROUP_TYPES.MOVIE,
      items: movieGroupItems,
    });

  } catch (error) {
    console.error('[userCreate]: Failed with error: ', error);
  }
});


module.exports = {
  userCleanup,
  userCreate,
};
