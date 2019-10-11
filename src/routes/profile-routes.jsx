import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PersonalInformation from '../components/pages/profile/personal-information/personal-information.container';
import ChangePassword from '../components/pages/profile/change-password/change-password.container';
import DangerZone from '../components/pages/profile/danger-zone/danger-zone.container';

import { PROFILE_PATHS } from '../constants/paths';

const ProfileRoutes = () => (
  <Switch>
    <Route path={PROFILE_PATHS.PERSONAL_INFORMATION} component={PersonalInformation} />
    <Route path={PROFILE_PATHS.CHANGE_PASSWORD} component={ChangePassword} />
    <Route path={PROFILE_PATHS.DANGER_ZONE} component={DangerZone} />
    <Redirect to={PROFILE_PATHS.PERSONAL_INFORMATION} />
  </Switch>
);

export default ProfileRoutes;
