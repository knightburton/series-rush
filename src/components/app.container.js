import { connect } from 'react-redux';

import { getIsAppWaiting } from '../store/app';
import { getFirebaseAuthIsLoaded } from '../store/auth';
import App from './app.component';

const mapStateToProps = state => ({
  authIsLoaded: getFirebaseAuthIsLoaded(state),
  isAppWaiting: getIsAppWaiting(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
