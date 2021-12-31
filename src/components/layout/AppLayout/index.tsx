import { Outlet } from 'react-router-dom';
import AppBar from '../AppBar';
import AppContent from '../AppContent';
import AppAlert from '../AppAlert';

const AppLayout = (): JSX.Element => (
  <main>
    <AppBar />
    <AppContent>
      <Outlet />
    </AppContent>
    <AppAlert />
  </main>
);

export default AppLayout;
