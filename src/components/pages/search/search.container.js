import { connect } from 'react-redux';

import { getSerachResult } from '../../../store/search';
import Search from './search.component';

const mapStateToProps = state => ({
  result: getSerachResult(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
