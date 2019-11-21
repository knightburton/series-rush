import { connect } from 'react-redux';
import CollectionTv from './collection-tv.component';

import { getGroupsByType } from '../../../../store/collection';
import { SEARCH_TYPES } from '../../../../constants/config';

const mapStateToProps = state => ({
  groups: getGroupsByType(SEARCH_TYPES.TV)(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionTv);
