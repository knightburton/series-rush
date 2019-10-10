import { connect } from 'react-redux';

import {
  getIsMobileDrawerOpened,
  toggleMobileDrawer,
} from '../../../store/app';
import Drawer from './drawer.component';

const mapStateToProps = state => ({
  isMobileDrawerOpened: getIsMobileDrawerOpened(state),
});

const mapDispatchToProps = {
  toggleMobileDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
