import { Navigate } from 'react-router-dom';
import { useSelector } from '../../../hooks/redux';
import { getIsAuthenticated } from '../../../store/auth';

export interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps): React.ReactNode => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
