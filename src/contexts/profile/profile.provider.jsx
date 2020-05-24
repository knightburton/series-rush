import React from 'react';
import PropTypes from 'prop-types';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

import Waiting from '../../components/widgets/waiting';

import ProfileContext from './context';

import {
  getProfile,
  getFirebaseAuthIsLoaded,
} from '../../store/auth';
import {
  getProfileGroupsByTypeQuery,
  getProfileCollectionByTypeQuery,
} from '../../utils/firebase';
import { COLLECTION_TYPE } from '../../constants/config';

const ProfileProvider = ({ children }) => {
  const authIsLoaded = useSelector(getFirebaseAuthIsLoaded);
  const profile = useSelector(getProfile);
  const { id } = profile;

  useFirestoreConnect(id && [
    getProfileGroupsByTypeQuery(id, COLLECTION_TYPE.TV),
    getProfileGroupsByTypeQuery(id, COLLECTION_TYPE.MOVIE),
    getProfileCollectionByTypeQuery(id, COLLECTION_TYPE.TV),
    getProfileCollectionByTypeQuery(id, COLLECTION_TYPE.MOVIE),
  ]);

  if (!authIsLoaded) return <Waiting type="screen" />;
  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};

ProfileProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

ProfileProvider.defaultProps = {};

export default ProfileProvider;
