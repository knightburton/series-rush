import React from 'react';

import Container from '@material-ui/core/Container';

import PersonalInformation from './personal-information/personal-information.container';

const Profile = () => (
  <Container maxWidth="md">
    <PersonalInformation />
  </Container>
);

export default Profile;
