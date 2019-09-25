import React from 'react';

import AppBar from './widgets/appbar/appbar.container';

import { ProfileProvider } from './contexts/profile';

import AppRoutes from '../routes/app-routes';

const App = () => (
  <>
    <ProfileProvider>
      <AppBar />
      <AppRoutes />
    </ProfileProvider>
  </>
);

export default App;
