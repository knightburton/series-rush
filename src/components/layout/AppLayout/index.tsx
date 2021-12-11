import { Outlet } from 'react-router-dom';
import AppBar from '../AppBar';
import AppContent from '../AppContent';

const AppLayout = (): JSX.Element => (
  <main>
    <AppBar />
    <AppContent>
      <Outlet />
    </AppContent>
  </main>
);

export default AppLayout;
