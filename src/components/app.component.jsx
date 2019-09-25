import React from 'react';
import PropTypes from 'prop-types';

import AppBar from './widgets/appbar/appbar.container';
import Waiting from './widgets/waiting/waiting.component';

import { ProfileProvider } from '../contexts/profile';

import AppRoutes from '../routes/app-routes';

const App = ({ authIsLoaded }) => (authIsLoaded ? (
  <>
    <ProfileProvider>
      <AppBar />
      <AppRoutes />
    </ProfileProvider>
  </>
) : (
  <Waiting />
));

App.propTypes = {
  authIsLoaded: PropTypes.bool.isRequired,
};

export default App;
