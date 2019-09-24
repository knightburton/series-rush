import { connect } from 'react-redux';

import { createProfile } from '../../../../store/profile';
import SignUpForm from './sign-up-form.component';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  createProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
