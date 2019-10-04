import { connect } from 'react-redux';

import { signOut } from '../../../store/auth';
import { toggleMobileDrawer } from '../../../store/app';
import AppBar from './appbar.component';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  signOut,
  toggleMobileDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
