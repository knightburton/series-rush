import React from 'react';

import Container from '@material-ui/core/Container';
import AsideTabsGrid from '../../commons/aside-tabs-grid/aside-tabs-grid.component';

import ProfileRoutes from '../../../routes/profile-routes';

import { PROFILE_MENU } from '../../../constants/navigation';
import { PROFILE_PATHS } from '../../../constants/paths';

const Profile = () => (
  <Container maxWidth="lg">
    <AsideTabsGrid
      tabs={PROFILE_MENU}
      defaultTab={PROFILE_PATHS.PERSONAL_INFORMATION}
    >
      <ProfileRoutes />
    </AsideTabsGrid>
  </Container>
);

export default Profile;
