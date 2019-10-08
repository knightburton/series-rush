import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import CollectionIcon from '@material-ui/icons/CollectionsOutlined';
import SearchIcon from '@material-ui/icons/SearchOutlined';

export default [
  {
    key: 'dashboard',
    title: 'page.dashboard.title',
    path: '/dashboard',
    exact: true,
    reverse: false,
    icon: DashboardIcon,
  },
  {
    key: 'collection',
    title: 'page.collection.title',
    path: '/collection',
    exact: false,
    reverse: false,
    icon: CollectionIcon,
  },
  {
    key: 'search',
    title: 'page.search.title',
    path: '/search',
    exact: false,
    reverse: false,
    icon: SearchIcon,
  },
];
