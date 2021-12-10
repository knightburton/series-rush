import { Outlet } from 'react-router-dom';
import AppBar from '../AppBar';

const AppLayout = (): JSX.Element => (
  <main>
    <AppBar />
    <Outlet />
  </main>
);

export default AppLayout;
