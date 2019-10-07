import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import CollectionIcon from '@material-ui/icons/CollectionsOutlined';

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
];
