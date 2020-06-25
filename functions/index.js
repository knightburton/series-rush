const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const { userCleanup, userCreate } = require('./src/triggers/auth');
// const { onProfileCollectionItemCreate } = require('./src/triggers/firestore');

// Auth triggers
exports.userCleanup = userCleanup;
exports.userCreate = userCreate;

// Firestore triggers
// exports.onProfileCollectionItemCreate = onProfileCollectionItemCreate;
