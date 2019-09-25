import { connect } from 'react-redux';

import {
  getLastAlert,
  removeAlert,
} from '../../../store/app';
import Alert from './alert.component';

const mapStateToProps = state => ({
  alert: getLastAlert(state),
});

const mapDispatchToProps = {
  removeAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
