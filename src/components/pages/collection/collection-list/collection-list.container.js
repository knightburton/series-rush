import { connect } from 'react-redux';
import CollectionList from './collection-list.component';

import {
  getGroupsByType,
  getSelectedGroupByType,
  getCollectionByTypeAndGroup,
  collectionSelectGroup,
} from '../../../../store/collection';

import { getPropertyByPath } from '../../../../utils';
import { COLLECTION_TYPE } from '../../../../constants/config';

const mapStateToProps = (state, { match }) => {
  const type = getPropertyByPath(match, 'params.listType', COLLECTION_TYPE.TV);
  const selectedGroup = getSelectedGroupByType(type)(state);

  return {
    groups: getGroupsByType(type)(state),
    list: getCollectionByTypeAndGroup(type, selectedGroup)(state),
    selectedGroup,
    type,
  };
};

const mapDispatchToProps = {
  collectionSelectGroup,
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
