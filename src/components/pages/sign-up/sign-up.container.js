import { connect } from 'react-redux';

import { getInProgress } from '../../../store/auth';
import SignUp from './sign-up.component';

const mapStateToProps = state => ({
  inProgress: getInProgress(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
