const functions = require('firebase-functions');

const onProfileCollectionItemCreate = functions.firestore.document('profiles/{userID}/collection/{itemID}').onCreate((snapshot, context) => {

});

module.exports = {
  onProfileCollectionItemCreate,
};
