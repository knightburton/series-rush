import { connect } from 'react-redux';

import {
  getPasswordInProgress,
  sendPasswordResetEmail,
  changePassword,
} from '../../../../store/auth';
import ChangePassword from './change-password.component';

const mapStateToProps = state => ({
  inProgress: getPasswordInProgress(state),
});

const mapDispatchToProps = {
  sendPasswordResetEmail,
  changePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
