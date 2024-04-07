import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../redux/auth/selectors';

const RestrictedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? <Navigate to="/contacts" /> : children;
};

RestrictedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RestrictedRoute;
