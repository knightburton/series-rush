import { Navigate } from 'react-router-dom';
import { useSelector } from 'hooks/redux';
import { getIsAuthenticated } from 'store/auth';

export interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
