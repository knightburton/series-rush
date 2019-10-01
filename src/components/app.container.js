import { connect } from 'react-redux';

import { getFirebaseAuthIsLoaded } from '../store/auth';
import App from './app.component';

const mapStateToProps = state => ({
  authIsLoaded: getFirebaseAuthIsLoaded(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
