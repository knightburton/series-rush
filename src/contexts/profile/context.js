import React from 'react';

const ProfileContext = React.createContext({
  signedIn: false,
  id: null,
  firstName: '',
  lastName: '',
  displayName: '',
  email: '',
  emailVerified: false,
  photoURL: '',
  photoName: '',
  lastLoginAt: null,
  createdAt: null,
});

export default ProfileContext;
