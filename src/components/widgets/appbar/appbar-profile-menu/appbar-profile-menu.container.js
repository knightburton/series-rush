import { connect } from 'react-redux';

import { signOut } from '../../../../store/auth';
import AppBarProfileMenu from './appbar-profile-menu.component';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBarProfileMenu);
