import { connect } from 'react-redux';

import { getSearchResult } from '../../../store/search';
import Search from './search.component';

const mapStateToProps = state => ({
  result: getSearchResult(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
