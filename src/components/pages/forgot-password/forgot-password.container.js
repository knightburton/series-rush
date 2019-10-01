import { connect } from 'react-redux';

import {
  getInProgress,
  sendPasswordResetEmail,
} from '../../../store/auth';
import ForgotPassword from './forgot-password.component';

const mapStateToProps = state => ({
  inProgress: getInProgress(state),
});

const mapDispatchToProps = {
  sendPasswordResetEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
