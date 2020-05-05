import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


import Container from '@material-ui/core/Container';
import AsideTabsGrid from '../../commons/aside-tabs-grid/aside-tabs-grid.component';

import PersonalInformation from './personal-information';
import ChangePassword from './change-password';
import DangerZone from './danger-zone';

import { PROFILE_MENU } from '../../../constants/navigation';
import { PROFILE_PATHS } from '../../../constants/paths';

const Profile = () => (
  <Container maxWidth="lg">
    <AsideTabsGrid
      tabs={PROFILE_MENU}
      defaultTab={PROFILE_PATHS.PERSONAL_INFORMATION}
    >
      <Switch>
        <Route path={PROFILE_PATHS.PERSONAL_INFORMATION} component={PersonalInformation} />
        <Route path={PROFILE_PATHS.CHANGE_PASSWORD} component={ChangePassword} />
        <Route path={PROFILE_PATHS.DANGER_ZONE} component={DangerZone} />
        <Redirect to={PROFILE_PATHS.PERSONAL_INFORMATION} />
      </Switch>
    </AsideTabsGrid>
  </Container>
);

export default Profile;
