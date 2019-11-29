import { connect } from 'react-redux';
import CollectionList from './collection-list.component';

import { getFirestoreOrderedByPath } from '../../../../store/firestore';

import { getPropertyByPath } from '../../../../utils';
import { SEARCH_TYPES } from '../../../../constants/config';

const mapStateToProps = (state, { match }) => ({
  groups: getFirestoreOrderedByPath(`${getPropertyByPath(match, 'params.listType', SEARCH_TYPES.TV)}Groups`)(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
