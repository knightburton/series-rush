import { connect } from 'react-redux';

import {
  getSearchResults,
  getSearchNumberOfPages,
  getSearchPage,
  getSearchQuery,
  search,
  searchBySelectedPage,
  clearSearchProps,
} from '../../../store/search';
import Search from './search.component';

const mapStateToProps = state => ({
  results: getSearchResults(state),
  numberOfPages: getSearchNumberOfPages(state),
  page: getSearchPage(state),
  searchQuery: getSearchQuery(state),
});

const mapDispatchToProps = {
  clearSearchProps,
  search,
  searchBySelectedPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
