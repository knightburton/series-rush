import { connect } from 'react-redux';

import {
  getPasswordInProgress,
  sendPasswordResetEmail,
} from '../../../../store/auth';
import ChangePassword from './change-password.component';

const mapStateToProps = state => ({
  inProgress: getPasswordInProgress(state),
});

const mapDispatchToProps = {
  sendPasswordResetEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
