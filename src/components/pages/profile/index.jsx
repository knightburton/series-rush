import React from 'react';
import { Outlet } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import NavigationTabsGrid from '../../commons/navigation-tabs-grid';

import { PROFILE_MENU } from '../../../constants/navigation';
import { APP_PATHS } from '../../../constants/paths';

const Profile = () => (
  <Container maxWidth="lg">
    <NavigationTabsGrid
      tabs={PROFILE_MENU}
      defaultTab={APP_PATHS.PROFILE_PERSONAL_INFORMATION.to}
    >
      <Outlet />
    </NavigationTabsGrid>
  </Container>
);

export default Profile;
