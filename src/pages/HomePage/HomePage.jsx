import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../redux/auth/selectors';
import AuthNav from '../../components/AuthNav/AuthNav';
import UserMenu from '../../components/UserMenu/UserMenu';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <div>
      <h1>Welcome to the Contacts Book App</h1>
      <p>This is the home page of your application.</p>
      {!isAuthenticated ? <AuthNav /> : <UserMenu />}
      {isAuthenticated && <NavLink to="/contacts">Go to Contacts</NavLink>}
    </div>
  );
};

export default HomePage;
