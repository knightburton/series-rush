import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import AppBar from './widgets/appbar/appbar.container';
import Drawer from './widgets/drawer/drawer.container';
import Alert from './widgets/alert/alert.container';
import Waiting from './widgets/waiting';
import ContentWrapper from './widgets/content-wrapper/content-wrapper.component';
import Footer from './widgets/footer/footer.component';
import ScrollToTop from './widgets/scroll-to-top';

import AppRoutes from '../routes/app-routes';

const App = ({ isAppWaiting, requestTmdbConfiguration }) => {
  useEffect(() => {
    requestTmdbConfiguration();
  }, [requestTmdbConfiguration]);

  return (
    <main>
      <ScrollToTop />
      <AppBar />
      <Drawer />
      <ContentWrapper>
        <AppRoutes />
      </ContentWrapper>
      <Footer />
      <Alert />
      {isAppWaiting && <Waiting type="app" />}
    </main>
  );
};

App.propTypes = {
  isAppWaiting: PropTypes.bool.isRequired,
  requestTmdbConfiguration: PropTypes.func.isRequired,
};

export default App;
