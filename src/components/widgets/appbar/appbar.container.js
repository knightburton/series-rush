import { connect } from 'react-redux';

import { getIsDrawerOpened } from '../../../store/app';
import AppBar from './appbar.component';

const mapStateToProps = state => ({
  isDrawerOpened: getIsDrawerOpened(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
