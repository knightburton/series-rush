import React from 'react';

import Container from '@material-ui/core/Container';

import PersonalInformation from './personal-information/personal-information.container';
import ChangePassword from './change-password/change-password.container';
import DangerZone from './danger-zone/danger-zone.container';

const Profile = () => (
  <Container maxWidth="md">
    <PersonalInformation />
    <ChangePassword />
    <DangerZone />
  </Container>
);

export default Profile;
