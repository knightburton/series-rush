import { connect } from 'react-redux';
import SearchResult from './search-result.component';

import {
  getGroupsByType,
  addToCollection,
} from '../../../../store/collection';
import { getPropertyByPath } from '../../../../utils';

const mapStateToProps = (state, { result }) => ({
  groups: getGroupsByType(getPropertyByPath(result, 'type'))(state),
});

const mapDispatchToProps = {
  addToCollection,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
