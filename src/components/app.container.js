import { connect } from 'react-redux';

import {
  getIsAppWaiting,
  requestTmdbConfiguration,
} from '../store/app';
import { getFirebaseAuthIsLoaded } from '../store/auth';
import App from './app.component';

const mapStateToProps = state => ({
  authIsLoaded: getFirebaseAuthIsLoaded(state),
  isAppWaiting: getIsAppWaiting(state),
});

const mapDispatchToProps = {
  requestTmdbConfiguration,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
