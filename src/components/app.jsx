import React, { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import AppBar from './widgets/appbar/appbar.container';
import Drawer from './widgets/drawer/drawer.container';
import AppAlert from './widgets/app-alert';
import Waiting from './widgets/waiting';
import ContentWrapper from './widgets/content-wrapper/content-wrapper.component';
import AppFooter from './widgets/app-footer';
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
      <Drawer />
      <ContentWrapper>
        <AppRoutes />
      </ContentWrapper>
      <AppFooter />
      <AppAlert />
      {isAppWaiting && (
        <Waiting type="app" />
      )}
    </main>
  );
};

export default App;
