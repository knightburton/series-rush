import { connect } from 'react-redux';

import {
  getInProgress,
  signIn,
} from '../../../../store/auth';
import SignInForm from './sign-in-form.component';

const mapStateToProps = state => ({
  inProgress: getInProgress(state),
});

const mapDispatchToProps = {
  signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
