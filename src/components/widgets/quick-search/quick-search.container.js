import { connect } from 'react-redux';

import {
  getSerachResult,
  seriesSearch,
} from '../../../store/search';
import QuickSearch from './quick-search.component';

const mapStateToProps = state => ({
  serachResult: getSerachResult(state),
});

const mapDispatchToProps = {
  seriesSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuickSearch);
