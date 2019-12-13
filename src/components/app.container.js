import { connect } from 'react-redux';

import {
  getIsAppWaiting,
  requestTmdbConfiguration,
} from '../store/app';
import App from './app.component';

const mapStateToProps = state => ({
  isAppWaiting: getIsAppWaiting(state),
});

const mapDispatchToProps = {
  requestTmdbConfiguration,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
