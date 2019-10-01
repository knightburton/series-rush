import React from 'react';
import PropTypes from 'prop-types';

import ProfileContext from './context';

const ProfileProvider = ({ children, profile }) => (
  <ProfileContext.Provider value={profile}>
    {children}
  </ProfileContext.Provider>
);

ProfileProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  profile: PropTypes.object,
};

ProfileProvider.defaultProps = {
  profile: {},
};

export default ProfileProvider;
