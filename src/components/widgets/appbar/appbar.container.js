import { connect } from 'react-redux';

import { signOut } from '../../../store/auth';
import AppBar from './appbar.component';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
