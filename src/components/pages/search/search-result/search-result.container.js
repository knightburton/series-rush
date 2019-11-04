import { connect } from 'react-redux';

import {
  addToSeriesCollection,
} from '../../../../store/collection';
import SearchResult from './search-result.component';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  addToSeriesCollection,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
