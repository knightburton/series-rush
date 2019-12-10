import { connect } from 'react-redux';
import CollectionList from './collection-list.component';

import {
  getGroupsByType,
  getSelectedGroupByType,
  collectionSelectGroup,
} from '../../../../store/collection';

import { getPropertyByPath } from '../../../../utils';
import { SEARCH_TYPES } from '../../../../constants/config';

const mapStateToProps = (state, { match }) => {
  const type = getPropertyByPath(match, 'params.listType', SEARCH_TYPES.TV);

  return {
    groups: getGroupsByType(type)(state),
    selectedGroup: getSelectedGroupByType(type)(state),
  };
};

const mapDispatchToProps = {
  collectionSelectGroup,
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
