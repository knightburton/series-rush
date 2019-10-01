import { connect } from 'react-redux';

import { getInProgress } from '../../../store/auth';
import SignIn from './sign-in.component';

const mapStateToProps = state => ({
  inProgress: getInProgress(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
