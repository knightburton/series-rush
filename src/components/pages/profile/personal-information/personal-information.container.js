import { connect } from 'react-redux';

import {
  getUpdateInProgress,
  updateName,
  updateEmail,
  uploadProfilePhoto,
  deleteProfilePhoto,
} from '../../../../store/auth';
import PersonalInformation from './personal-information.component';

const mapStateToProps = state => ({
  updateInProgress: getUpdateInProgress(state),
});

const mapDispatchToProps = {
  updateName,
  updateEmail,
  uploadProfilePhoto,
  deleteProfilePhoto,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation);
