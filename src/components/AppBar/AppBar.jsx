
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';

const AppBar = () => {
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const location = useLocation();

  return (
    <header>
      {isAuthenticated && location.pathname === '/' ? (
        <>
          <UserMenu />
          <Navigation />
        </>
      ) : (
        <>
          <Navigation />
          {isAuthenticated && <UserMenu />}
        </>
      )}
    </header>
  );
};

export default AppBar;
