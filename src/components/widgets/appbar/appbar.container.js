import { connect } from 'react-redux';

import {
  getIsSignedIn,
  signOut,
} from '../../../store/auth';
import AppBar from './appbar.component';

const mapStateToProps = state => ({
  isSignedIn: getIsSignedIn(state),
});

const mapDispatchToProps = {
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
