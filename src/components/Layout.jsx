import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import AppBar from './AppBar/AppBar';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsLoggedIn);

  const showAppBarOnTop = location.pathname === '/contacts';

  return (
    <>
      {showAppBarOnTop && isAuthenticated && <AppBar />}
      <main>{children}</main>
      {(!showAppBarOnTop || !isAuthenticated) && <AppBar />}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
