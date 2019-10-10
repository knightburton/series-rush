import { connect } from 'react-redux';

import {
  toggleMobileDrawer,
} from '../../../../store/app';
import AppBarDrawerButton from './appbar-drawer-button.component';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  toggleMobileDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBarDrawerButton);
