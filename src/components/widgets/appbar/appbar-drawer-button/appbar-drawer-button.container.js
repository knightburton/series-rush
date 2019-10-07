import { connect } from 'react-redux';

import {
  toggleDrawer,
  toggleMobileDrawer,
} from '../../../../store/app';
import AppBarDrawerButton from './appbar-drawer-button.component';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  toggleDrawer,
  toggleMobileDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBarDrawerButton);
