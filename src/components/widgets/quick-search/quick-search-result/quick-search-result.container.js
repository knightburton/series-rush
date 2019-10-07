import { connect } from 'react-redux';

import {
  getFourSearchResult,
  getHasMoreResult,
  getSearching,
} from '../../../../store/search';
import QuickSearchResult from './quick-search-result.component';

const mapStateToProps = state => ({
  result: getFourSearchResult(state),
  searching: getSearching(state),
  hasMoreResult: getHasMoreResult(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(QuickSearchResult);
