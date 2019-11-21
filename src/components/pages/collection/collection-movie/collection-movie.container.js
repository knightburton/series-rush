import { connect } from 'react-redux';
import CollectionMovie from './collection-movie.component';

import { getGroupsByType } from '../../../../store/collection';
import { SEARCH_TYPES } from '../../../../constants/config';

const mapStateToProps = state => ({
  groups: getGroupsByType(SEARCH_TYPES.MOVIE)(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionMovie);
