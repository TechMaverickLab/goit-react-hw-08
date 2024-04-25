import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing } from '../redux/auth/selectors';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children, redirectTo = '/login' }) => {
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  
  if (isRefreshing) {
    return <div>Loading...</div>;
  }

  
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string
};

export default PrivateRoute;