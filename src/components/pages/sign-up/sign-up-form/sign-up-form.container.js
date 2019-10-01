import { connect } from 'react-redux';

import {
  createProfile,
  getInProgress,
} from '../../../../store/auth';
import SignUpForm from './sign-up-form.component';

const mapStateToProps = state => ({
  inProgress: getInProgress(state),
});

const mapDispatchToProps = {
  createProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
