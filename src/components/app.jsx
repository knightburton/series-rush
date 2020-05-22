import React from 'react';
import { useSelector } from 'react-redux';

import AppAlert from './widgets/app-alert';
import AppBar from './widgets/app-bar';
import AppContent from './widgets/app-content';
import AppDrawer from './widgets/app-drawer';
import AppFooter from './widgets/app-footer';
import AppHeader from './widgets/app-header';
import Waiting from './widgets/waiting';
import ScrollToTop from './widgets/scroll-to-top';

import AppRoutes from '../routes/app-routes';

import { getIsAppWaiting } from '../store/app';

const App = () => {
  const isAppWaiting = useSelector(getIsAppWaiting);

  return (
    <main>
      <ScrollToTop />
      <AppHeader />
      <AppBar />
      <AppDrawer />
      <AppContent>
        <AppRoutes />
      </AppContent>
      <AppFooter />
      <AppAlert />
      {isAppWaiting && (
        <Waiting type="app" />
      )}
    </main>
  );
};

export default App;
