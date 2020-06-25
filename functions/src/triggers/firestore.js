const functions = require('firebase-functions');
const admin = require('firebase-admin');
const tmdbApi = require('../request/tmdbApi');

const { ITEM_TYPES } = require('../constants');
const { COMMON_ERRORS } = require('../constants/errors');

const onProfileCollectionItemCreate = functions.firestore.document('profiles/{userID}/collection/{itemID}').onCreate(async (snapshot, context) => {
  const created = snapshot.data();

  // Get the type of the created item.
  const { type } = created;

  try {
    // Make sure we have a proper type and itemID.
    if (!type || !Object.values(ITEM_TYPES).includes(type) || !context.params.itemID) throw new Error(COMMON_ERRORS.MISSING_PARAMS);

    // Request the detials of the new item.
    const detailedItem = await tmdbApi.getDetailsByTypeAndId(type, context.params.itemID);

    // Store all the data right away as cache.
    const cacheRef = admin.firestore().collection('cache').doc(context.params.itemID);
    await cacheRef.set(detailedItem);

    console.log('[onProfileCollectionItemCreate]: new item has been cached: ', context.params.itemID);
  } catch (error) {
    console.error('[onProfileCollectionItemCreate]: Failed with error: ', error);
  }
});

module.exports = {
  onProfileCollectionItemCreate,
};
