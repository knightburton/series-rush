import { connect } from 'react-redux';

import { getValidGroupsByType } from '../../../../store/collection';
import CollectionTv from './collection-tv.component';

const mapStateToProps = state => ({
  groups: getValidGroupsByType('tv')(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionTv);
