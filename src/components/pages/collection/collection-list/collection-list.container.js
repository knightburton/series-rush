import { connect } from 'react-redux';
import CollectionList from './collection-list.component';

import {
  getGroupsByType,
  getSelectedGroupByType,
  getCollectionByTypeAndGroup,
  collectionSelectGroup,
} from '../../../../store/collection';

import { getPropertyByPath } from '../../../../utils';
import { SEARCH_TYPES } from '../../../../constants/config';

const mapStateToProps = (state, { match }) => {
  const type = getPropertyByPath(match, 'params.listType', SEARCH_TYPES.TV);
  const selectedGroup = getSelectedGroupByType(type)(state);

  return {
    groups: getGroupsByType(type)(state),
    list: getCollectionByTypeAndGroup(type, selectedGroup)(state),
    selectedGroup,
  };
};

const mapDispatchToProps = {
  collectionSelectGroup,
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
