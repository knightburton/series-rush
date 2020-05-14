import React from 'react';
import PropTypes from 'prop-types';
import { useFirestoreConnect } from 'react-redux-firebase';

import Waiting from '../../components/widgets/waiting';

import ProfileContext from './context';

import {
  getProfileGroupsByTypeQuery,
  getProfileCollectionByTypeQuery,
} from '../../utils/firebase';
import { COLLECTION_TYPE } from '../../constants/config';

const ProfileProvider = ({ children, authIsLoaded, profile }) => {
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
  authIsLoaded: PropTypes.bool.isRequired,
  profile: PropTypes.object,
};

ProfileProvider.defaultProps = {
  profile: {},
};

export default ProfileProvider;
