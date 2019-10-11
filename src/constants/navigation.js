import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import CollectionIcon from '@material-ui/icons/CollectionsOutlined';

import { APP_PATHS, PROFILE_PATHS } from './paths';

export const MAIN_MENU = [
  {
    key: 'dashboard',
    title: 'page.dashboard.title',
    path: APP_PATHS.DASHBOARD,
    icon: DashboardIcon,
  },
  {
    key: 'collection',
    title: 'page.collection.title',
    path: APP_PATHS.COLLECTION,
    icon: CollectionIcon,
  },
];

export const PROFILE_MENU = [
  {
    key: 'personal-information',
    path: PROFILE_PATHS.PERSONAL_INFORMATION,
    title: 'page.profile.personalInformation.title',
  },
  {
    key: 'change-password',
    path: PROFILE_PATHS.CHANGE_PASSWORD,
    title: 'page.profile.changePassword.title',
  },
  {
    key: 'danger-zone',
    path: PROFILE_PATHS.DANGER_ZONE,
    title: 'page.profile.dangerZone.title',
  },
];
