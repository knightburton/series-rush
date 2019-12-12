const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const { userCleanup, userCreate } = require('./src/triggers/auth');

// Auth triggers
exports.userCleanup = userCleanup;
exports.userCreate = userCreate;
