import { connect } from 'react-redux';

import {
  getSearchResults,
  getSearchQuery,
  clearSearchQuery,
} from '../../../store/search';
import Search from './search.component';

const mapStateToProps = state => ({
  results: getSearchResults(state),
  searchQuery: getSearchQuery(state),
});

const mapDispatchToProps = {
  clearSearchQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
