import { connect } from 'react-redux';

import {
  seriesSearch,
  clearSearchResult,
} from '../../../store/search';
import QuickSearch from './quick-search.component';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  seriesSearch,
  clearSearchResult,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuickSearch);
