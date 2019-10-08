import { connect } from 'react-redux';

import {
  getFourSearchResult,
  getHasMoreResult,
  getSearching,
} from '../../../../store/search';
import {
  addToSeriesCollection,
} from '../../../../store/collection';
import QuickSearchResult from './quick-search-result.component';

const mapStateToProps = state => ({
  result: getFourSearchResult(state),
  searching: getSearching(state),
  hasMoreResult: getHasMoreResult(state),
});

const mapDispatchToProps = {
  addToSeriesCollection,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuickSearchResult);
