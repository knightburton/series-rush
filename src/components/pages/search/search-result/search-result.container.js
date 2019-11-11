import { connect } from 'react-redux';

import {
  addToCollection,
} from '../../../../store/collection';
import SearchResult from './search-result.component';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  addToCollection,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
