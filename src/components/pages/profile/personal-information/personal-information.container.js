import { connect } from 'react-redux';

import {
  updateName,
  updateEmail,
} from '../../../../store/auth';
import PersonalInformation from './personal-information.component';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  updateName,
  updateEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation);
