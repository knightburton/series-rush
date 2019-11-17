const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const { userCleanup, userCreate } = require('./auth-triggers');

// Auth triggers
exports.userCleanup = userCleanup;
exports.userCreate = userCreate;
