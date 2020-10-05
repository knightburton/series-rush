import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import NavigationTabsGrid from '../../commons/navigation-tabs-grid';

import PersonalInformation from './personal-information';
import ChangePassword from './change-password';
import DangerZone from './danger-zone';

import { PROFILE_MENU } from '../../../constants/navigation';
import { APP_PATHS } from '../../../constants/paths';

const Profile = () => (
  <Container maxWidth="lg">
    <NavigationTabsGrid
      tabs={PROFILE_MENU}
      defaultTab={APP_PATHS.PROFILE_PERSONAL_INFORMATION.path}
    >
      <Switch>
        <Route path={APP_PATHS.PROFILE_PERSONAL_INFORMATION.path} component={PersonalInformation} />
        <Route path={APP_PATHS.PROFILE_CHANGE_PASSWORD.path} component={ChangePassword} />
        <Route path={APP_PATHS.PROFILE_DANGER_ZONE.path} component={DangerZone} />
        <Redirect to={APP_PATHS.PROFILE_PERSONAL_INFORMATION.path} />
      </Switch>
    </NavigationTabsGrid>
  </Container>
);

export default Profile;
