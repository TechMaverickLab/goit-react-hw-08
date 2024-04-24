import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing } from '../redux/auth/selectors';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children, redirectTo = '/login' }) => {
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  // Показуємо індикатор завантаження поки відбувається перевірка токена
  if (isRefreshing) {
    return <div>Loading...</div>;
  }

  // Якщо користувач не аутентифікований, перенаправляємо його на сторінку логіну
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string
};

export default PrivateRoute;