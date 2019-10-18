import { connect } from 'react-redux';

import {
  getSearchResults,
  getSearchNumberOfPages,
  getSearchPage,
  getSearchQuery,
  search,
  clearSearchProps,
} from '../../../store/search';
import Search from './search.component';

const mapStateToProps = state => ({
  results: getSearchResults(state),
  numberOfPages: getSearchNumberOfPages(state),
  page: getSearchPage(state),
  query: getSearchQuery(state),
});

const mapDispatchToProps = {
  clearSearchProps,
  search,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
