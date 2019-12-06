const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebaseTools = require('firebase-tools');
const {
  GROUP_TYPES,
} = require('../constants');

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
    const profileDoc = admin.firestore().collection('profiles').doc(uid);
    const queryDocumentSnapshot = await profileDoc.get();
    const photoName = queryDocumentSnapshot.get('photoName');

    if (photoName) {
      console.log('[userCleanup]: Cleanup profile photo...');
      const userProfilePhotoPath = `profiles/${uid}/${photoName}`;
      await bucket.file(userProfilePhotoPath).delete();
    }

    console.log('[userCleanup]: Cleanup profile data...');
    await profileDoc.delete();

    console.log('[userCleanup]: Cleanup collections data...');
    const collectionPath = `collections/${uid}`;
    await firebaseTools.firestore.delete(collectionPath, {
      project: process.env.GCLOUD_PROJECT,
      recursive: true,
      yes: true,
    });

  } catch (error) {
    console.error('[userCleanup]: Failed with error: ', error);
  }
});

/**
 * Creates the new fixed length tv and movi groups for the new user.
 */
const userCreate = functions.auth.user().onCreate(async user => {
  const { uid } = user;

  console.log('[userCreate]: User ID: ', uid);

  try {
    const baseRef = admin.firestore().collection('collections').doc(uid).collection('groups');

    console.log('[userCreate]: Start to create the default collection groups for the user...');
    const promises = Object.values(GROUP_TYPES).map(type => {
      console.log(`[userCreate]: Create the default ${type} group...`);
      return baseRef.add({
        label: 'Default',
        color: '',
        type: type,
      });
    });

    await Promise.all(promises);
  } catch (error) {
    console.error('[userCreate]: Failed with error: ', error);
  }
});


module.exports = {
  userCleanup,
  userCreate,
};
