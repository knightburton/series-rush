import { Navigate } from 'react-router-dom';
import { useSelector } from 'hooks/redux';
import { getIsAuthenticated } from 'store/auth';

export interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute = ({ children }: PublicRouteProps): JSX.Element => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  return !isAuthenticated ? children : <Navigate to="/" />;
};

export default PublicRoute;
