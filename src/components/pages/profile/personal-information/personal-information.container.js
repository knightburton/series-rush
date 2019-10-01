import { connect } from 'react-redux';

import { updateEmail } from '../../../../store/auth';
import PersonalInformation from './personal-information.component';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  updateEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation);
