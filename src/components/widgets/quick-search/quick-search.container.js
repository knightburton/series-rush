import { connect } from 'react-redux';

import {
  search,
} from '../../../store/search';
import QuickSearch from './quick-search.component';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  search,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuickSearch);
