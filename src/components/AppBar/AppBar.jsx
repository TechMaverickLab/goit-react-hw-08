import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../redux/auth/selectors';
import Navigation from '../Navigation/Navigation';
import AuthNav from '../AuthNav/AuthNav';
import UserMenu from '../UserMenu/UserMenu';

const AppBar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <header>
      
      {!isAuthenticated && <AuthNav />}
      {isAuthenticated && <UserMenu />}
      <Navigation />
    </header>
  );
};

export default AppBar;
