import { connect } from 'react-redux';

import { getIsDrawerOpened } from '../../../store/app';
import ContentWrapper from './content-wrapper.component';

const mapStateToProps = state => ({
  isDrawerOpened: getIsDrawerOpened(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContentWrapper);
