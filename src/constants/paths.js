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
    path: '/',
    title: '',
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
  COLLECTIONS: {
    key: 'collections',
    path: '/collections',
    title: 'page.collections.title',
    icon: LibraryBooksTwoToneIcon,
  },
  COLLECTIONS_VIEW: {
    key: 'collectionsType',
    path: '/collections/:type',
    title: 'page.collections.title',
    icon: LibraryBooksTwoToneIcon,
  },
  COLLECTIONS_TV: {
    key: 'collectionsTv',
    path: '/collections/tv',
    title: 'page.collections.menu.tv',
    icon: TvTwoToneIcon,
  },
  COLLECTIONS_MOVIE: {
    key: 'collectionsMovie',
    path: '/collections/movie',
    title: 'page.collections.menu.movie',
    icon: MovieTwoToneIcon,
  },
  COLLECTIONS_EDIT: {
    key: 'collectionsEdit',
    path: '/collections/:type/edit',
    title: 'page.collections.edit.title',
    icon: EditTwoToneIcon,
  },
  COLLECTIONS_EDIT_GROUPS: {
    key: 'collectionsEditGroups',
    path: '/collections/:type/edit/groups',
    title: 'page.collections.edit.groups.title',
    icon: EditTwoToneIcon,
  },
  COLLECTIONS_EDIT_TV_GROUPS: {
    key: 'collectionsEditTvGroups',
    path: '/collections/tv/edit/groups',
    title: 'page.collections.menu.tv',
    icon: EditTwoToneIcon,
  },
  COLLECTIONS_EDIT_MOVIE_GROUPS: {
    key: 'collectionsEditMovieGroups',
    path: '/collections/movie/edit/groups',
    title: 'page.collections.menu.movie',
    icon: EditTwoToneIcon,
  },
  SEARCH: {
    key: 'search',
    path: '/search',
    title: 'page.search.title',
    icon: SearchTwoToneIcon,
  },
};
