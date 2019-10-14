const functions = require('firebase-functions');
const admin = require('firebase-admin');

const userDataCleanup = functions.auth.user().onDelete(async user => {
  const bucket = admin.storage().bucket();
  const { uid } = user;

  console.log('[userDataCleanup]: User ID: ', uid);

  try {
    const firestoreDoc = admin.firestore().collection('profiles').doc(uid);
    const queryDocumentSnapshot = await firestoreDoc.get();
    const photoName = queryDocumentSnapshot.get('photoName');

    if (photoName) {
      console.log('[userDataCleanup]: Cleanup profile photo...');
      const userProfilePhotoPath = `profiles/${uid}/${photoName}`;
      await bucket.file(userProfilePhotoPath).delete();
    }

    console.log('[userDataCleanup]: Cleanup profile data...');
    await firestoreDoc.delete();

  } catch (error) {
    console.error('[userDataCleanup]: Failed with error: ', error);
  }
});


module.exports = {
  userDataCleanup,
};
