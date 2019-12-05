import { connect } from 'react-redux';
import CollectionProviderComponent from './collection.provider';
import CollectionContext from './context';
import { getProfile } from '../../store/auth';

const mapStateToProps = state => ({
  profile: getProfile(state),
});

const mapDispatchToProps = {};

export const CollectionProvider = connect(mapStateToProps, mapDispatchToProps)(CollectionProviderComponent);
export const CollectionConsumer = CollectionContext.Consumer;
export default CollectionContext;
