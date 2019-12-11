const functions = require('firebase-functions');

const onCollectionGroupItemCreate = functions.firestore.document('collections/{userID}/groups/{groupID}/groupItems/{itemID}').onCreate((snapshot, context) => {

});

module.exports = {
  onCollectionTvItemCreate,
  onCollectionMovieItemCreate,
};
