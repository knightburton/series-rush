import { connect } from 'react-redux';

import { getSearchResults } from '../../../../store/search';
import SearchResults from './search-results.component';

const mapStateToProps = state => ({
  results: getSearchResults(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
