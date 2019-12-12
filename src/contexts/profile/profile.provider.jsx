import React from 'react';
import PropTypes from 'prop-types';
import { useFirestoreConnect } from 'react-redux-firebase';

import ProfileContext from './context';

import {
  getProfileGroupsByTypeQuery,
  getProfileCollectionByTypeQuery,
} from '../../utils';
import { COLLECTION_TYPE } from '../../constants/config';

const ProfileProvider = ({ children, profile }) => {
  const { id } = profile;
  useFirestoreConnect(id && [
    getProfileGroupsByTypeQuery(id, COLLECTION_TYPE.TV),
    getProfileGroupsByTypeQuery(id, COLLECTION_TYPE.MOVIE),
    getProfileCollectionByTypeQuery(id, COLLECTION_TYPE.TV),
    getProfileCollectionByTypeQuery(id, COLLECTION_TYPE.MOVIE),
  ]);

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};

ProfileProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  profile: PropTypes.object,
};

ProfileProvider.defaultProps = {
  profile: {},
};

export default ProfileProvider;
