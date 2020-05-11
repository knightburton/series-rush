import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';
import AssignmentIndTwoToneIcon from '@material-ui/icons/AssignmentIndTwoTone';
import VpnKeyTwoToneIcon from '@material-ui/icons/VpnKeyTwoTone';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import LibraryBooksTwoToneIcon from '@material-ui/icons/LibraryBooksTwoTone';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import ReportProblemTwoToneIcon from '@material-ui/icons/ReportProblemTwoTone';
import TvTwoToneIcon from '@material-ui/icons/TvTwoTone';
import MovieTwoToneIcon from '@material-ui/icons/MovieTwoTone';

export const MAIN_PATHS = {};

export const APP_PATHS = {
  LANDING: {
    key: 'landing',
    path: '/',
    title: 'page.landing.title',
    icon: null,
  },
  SIGN_IN: {
    key: 'signIn',
    path: '/sign-in',
    title: 'page.signIn.title',
    icon: LockOpenTwoToneIcon,
  },
  SIGN_UP: {
    key: 'signUp',
    path: '/sign-up',
    title: 'page.signUp.title',
    icon: AssignmentIndTwoToneIcon,
  },
  FORGOT_PASSWORD: {
    key: 'forgotPassword',
    path: '/forgot-password',
    title: 'page.forgotPassword.title',
    icon: VpnKeyTwoToneIcon,
  },
  DASHBOARD: {
    key: 'dashboard',
    path: '/dashboard',
    title: 'page.dashboard.title',
    icon: DashboardTwoToneIcon,
  },
  PROFILE: {
    key: 'profile',
    path: '/profile',
    title: 'page.profile.title',
    icon: PersonOutlineTwoToneIcon,
  },
  PROFILE_PERSONAL_INFORMATION: {
    key: 'profilePersonalInformation',
    path: '/profile/personal-information',
    title: 'page.profile.personalInformation.title',
    icon: AccountCircleTwoToneIcon,
  },
  PROFILE_CHANGE_PASSWORD: {
    key: 'profileChangePassword',
    path: '/profile/change-password',
    title: 'page.profile.changePassword.title',
    icon: VpnKeyTwoToneIcon,
  },
  PROFILE_DANGER_ZONE: {
    key: 'profileDangerZone',
    path: '/profile/danger-zone',
    title: 'page.profile.dangerZone.title',
    icon: ReportProblemTwoToneIcon,
  },
  COLLECTION: {
    key: 'collection',
    path: '/collection',
    title: 'page.collection.title',
    icon: LibraryBooksTwoToneIcon,
  },
  COLLECTION_LIST: {
    key: 'collectionList',
    path: '/collection/:type',
    title: 'page.collection.title',
    icon: LibraryBooksTwoToneIcon,
  },
  COLLECTION_LIST_TV: {
    key: 'collectionListTv',
    path: '/collection/tv',
    title: 'page.collection.menu.tv',
    icon: TvTwoToneIcon,
  },
  COLLECTION_LIST_MOVIE: {
    key: 'collectionListMovie',
    path: '/collection/movie',
    title: 'page.collection.menu.movie',
    icon: MovieTwoToneIcon,
  },
  SEARCH: {
    key: 'search',
    path: '/search',
    title: 'page.search.title',
    icon: SearchTwoToneIcon,
  },
};

export const PROFILE_PATHS = {
  PERSONAL_INFORMATION: '/profile/personal-information',
  CHANGE_PASSWORD: '/profile/change-password',
  DANGER_ZONE: '/profile/danger-zone',
};

export const COLLECTION_PATHS = {
  LIST: '/collection/:listType',
  LIST_TV: '/collection/tv',
  LIST_MOVIE: '/collection/movie',
};
