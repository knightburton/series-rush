import { connect } from 'react-redux';

import { seriesSearch } from '../../../store/search';
import QuickSearch from './quick-search.component';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  seriesSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuickSearch);
