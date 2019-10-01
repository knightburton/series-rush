import React from 'react';

import Container from '@material-ui/core/Container';

import PersonalInformation from './personal-information/personal-information.container';
import DangerZone from './danger-zone/danger-zone.container';

const Profile = () => (
  <Container maxWidth="md">
    <PersonalInformation />
    <DangerZone />
  </Container>
);

export default Profile;
