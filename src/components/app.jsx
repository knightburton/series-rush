import React, { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import AppAlert from './widgets/app-alert';
import AppBar from './widgets/app-bar';
import AppContent from './widgets/app-content';
import AppDrawer from './widgets/app-drawer';
import AppFooter from './widgets/app-footer';
import Waiting from './widgets/waiting';
import ScrollToTop from './widgets/scroll-to-top';

import AppRoutes from '../routes/app-routes';

import {
  getIsAppWaiting,
  requestTmdbConfiguration,
} from '../store/app';

const App = () => {
  const dispatch = useDispatch();
  const isAppWaiting = useSelector(getIsAppWaiting);

  useEffect(() => {
    dispatch(requestTmdbConfiguration());
  }, [dispatch]);

  return (
    <main>
      <ScrollToTop />
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
