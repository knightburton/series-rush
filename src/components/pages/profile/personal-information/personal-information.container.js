import { connect } from 'react-redux';

import {
  updateName,
  updateEmail,
  uploadProfilePhoto,
  deleteProfilePhoto,
} from '../../../../store/auth';
import PersonalInformation from './personal-information.component';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  updateName,
  updateEmail,
  uploadProfilePhoto,
  deleteProfilePhoto,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation);
