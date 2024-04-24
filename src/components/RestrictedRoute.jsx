import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing } from '../redux/auth/selectors';

const RestrictedRoute = ({ component: Component, redirectTo = '/contacts' }) => {
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing) return <div>Loading...</div>;
  return !isAuthenticated ? <Component /> : <Navigate to={redirectTo} />;
};

RestrictedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  redirectTo: PropTypes.string,
};

export default RestrictedRoute;