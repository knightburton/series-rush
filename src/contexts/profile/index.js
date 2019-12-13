import { connect } from 'react-redux';
import {
  getProfile,
  getFirebaseAuthIsLoaded,
} from '../../store/auth';
import ProfileProviderComponent from './profile.provider';
import ProfileContext from './context';

const mapStateToProps = state => ({
  authIsLoaded: getFirebaseAuthIsLoaded(state),
  profile: getProfile(state),
});

const mapDispatchToProps = {};

export const ProfileProvider = connect(mapStateToProps, mapDispatchToProps)(ProfileProviderComponent);
export const ProfileConsumer = ProfileContext.Consumer;
export default ProfileContext;
