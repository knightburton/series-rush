const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const { userDataCleanup } = require('./auth-triggers');

// Auth triggers
exports.userDataCleanup = userDataCleanup;
