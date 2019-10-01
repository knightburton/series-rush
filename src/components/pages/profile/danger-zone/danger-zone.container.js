import { connect } from 'react-redux';

import {
  requestEmailVerification,
  deleteProfile,
} from '../../../../store/auth';
import DangerZone from './danger-zone.component';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  requestEmailVerification,
  deleteProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(DangerZone);
