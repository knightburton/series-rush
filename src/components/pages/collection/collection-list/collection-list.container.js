import { connect } from 'react-redux';
import CollectionList from './collection-list.component';

import { getGroupsByType } from '../../../../store/collection';

import { getPropertyByPath } from '../../../../utils';
import { SEARCH_TYPES } from '../../../../constants/config';

const mapStateToProps = (state, { match }) => ({
  groups: getGroupsByType(getPropertyByPath(match, 'params.listType', SEARCH_TYPES.TV))(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
