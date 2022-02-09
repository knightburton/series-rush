import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'hooks/redux';
import { getIsAuthenticated } from 'store/auth';

const PublicRoute = (): JSX.Element => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
