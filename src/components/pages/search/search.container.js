import { connect } from 'react-redux';

import {
  getSearchResult,
  getSearchQuery,
  clearSearchQuery,
} from '../../../store/search';
import Search from './search.component';

const mapStateToProps = state => ({
  result: getSearchResult(state),
  searchQuery: getSearchQuery(state),
});

const mapDispatchToProps = {
  clearSearchQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
