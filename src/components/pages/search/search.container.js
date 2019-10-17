import { connect } from 'react-redux';

import {
  getSearchResults,
  getSearchQuery,
  clearSearchQuery,
  search,
} from '../../../store/search';
import Search from './search.component';

const mapStateToProps = state => ({
  results: getSearchResults(state),
  searchQuery: getSearchQuery(state),
});

const mapDispatchToProps = {
  clearSearchQuery,
  search,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
