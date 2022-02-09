import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'hooks/redux';
import { getIsAuthenticated } from 'store/auth';

const PrivateRoute = (): JSX.Element => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
