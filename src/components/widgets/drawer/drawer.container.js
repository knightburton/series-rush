import { connect } from 'react-redux';

import {
  getIsDrawerOpened,
  getIsMobileDrawerOpened,
  toggleDrawer,
  toggleMobileDrawer,
} from '../../../store/app';
import Drawer from './drawer.component';

const mapStateToProps = state => ({
  isDrawerOpened: getIsDrawerOpened(state),
  isMobileDrawerOpened: getIsMobileDrawerOpened(state),
});

const mapDispatchToProps = {
  toggleDrawer,
  toggleMobileDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
