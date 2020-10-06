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
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';

export const MAIN_PATHS = {};

export const APP_PATHS = {
  LANDING: {
    key: 'landing',
    to: '/',
    path: '/',
    title: '',
    icon: null,
  },
  SIGN_IN: {
    key: 'signIn',
    to: '/sign-in',
    path: '/sign-in',
    title: 'page.signIn.title',
    icon: LockOpenTwoToneIcon,
  },
  SIGN_UP: {
    key: 'signUp',
    to: '/sign-up',
    path: '/sign-up',
    title: 'page.signUp.title',
    icon: AssignmentIndTwoToneIcon,
  },
  FORGOT_PASSWORD: {
    key: 'forgotPassword',
    to: '/forgot-password',
    path: '/forgot-password',
    title: 'page.forgotPassword.title',
    icon: VpnKeyTwoToneIcon,
  },
  DASHBOARD: {
    key: 'dashboard',
    to: '/dashboard',
    path: '/dashboard',
    title: 'page.dashboard.title',
    icon: DashboardTwoToneIcon,
  },
  PROFILE: {
    key: 'profile',
    to: '/profile',
    path: '/profile/*',
    title: 'page.profile.title',
    icon: PersonOutlineTwoToneIcon,
  },
  PROFILE_PERSONAL_INFORMATION: {
    key: 'profilePersonalInformation',
    to: '/profile/personal-information',
    path: '/personal-information',
    title: 'page.profile.personalInformation.title',
    icon: AccountCircleTwoToneIcon,
  },
  PROFILE_CHANGE_PASSWORD: {
    key: 'profileChangePassword',
    to: '/profile/change-password',
    path: '/change-password',
    title: 'page.profile.changePassword.title',
    icon: VpnKeyTwoToneIcon,
  },
  PROFILE_DANGER_ZONE: {
    key: 'profileDangerZone',
    to: '/profile/danger-zone',
    path: '/danger-zone',
    title: 'page.profile.dangerZone.title',
    icon: ReportProblemTwoToneIcon,
  },
  COLLECTIONS: {
    key: 'collections',
    to: '/collections',
    path: '/collections/*',
    title: 'page.collections.title',
    icon: LibraryBooksTwoToneIcon,
  },
  COLLECTIONS_TYPE: {
    key: 'collectionsType',
    to: '/collections/:type',
    path: '/:type',
    title: 'page.collections.title',
    icon: LibraryBooksTwoToneIcon,
  },
  COLLECTIONS_TV: {
    key: 'collectionsTv',
    to: '/collections/tv',
    path: '/tv',
    title: 'page.collections.menu.tv',
    icon: TvTwoToneIcon,
  },
  COLLECTIONS_MOVIE: {
    key: 'collectionsMovie',
    to: '/collections/movie',
    path: '/movie',
    title: 'page.collections.menu.movie',
    icon: MovieTwoToneIcon,
  },
  COLLECTIONS_EDIT: {
    key: 'collectionsEdit',
    to: '/collections/:type/edit',
    path: '/edit',
    title: 'page.collections.edit.title',
    icon: EditTwoToneIcon,
  },
  COLLECTIONS_EDIT_TV: {
    key: 'collectionsEditTv',
    to: '/collections/tv/edit',
    path: '/tv/edit',
    title: 'page.collections.menu.tv',
    icon: EditTwoToneIcon,
  },
  COLLECTIONS_EDIT_MOVIE: {
    key: 'collectionsEditMovie',
    to: '/collections/movie/edit',
    path: '/movie/edit',
    title: 'page.collections.menu.movie',
    icon: EditTwoToneIcon,
  },
  SEARCH: {
    key: 'search',
    to: '/search',
    path: '/search',
    title: 'page.search.title',
    icon: SearchTwoToneIcon,
  },
};
