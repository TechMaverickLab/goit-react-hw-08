import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  return (
    <nav>
      {location.pathname !== '/' && (
        <>
          <NavLink to="/">Home</NavLink>
          {(location.pathname !== '/contacts' && isLoggedIn) || (!isLoggedIn && (location.pathname !== '/login' || location.pathname !== '/register')) ? <span> | </span> : null}
        </>
      )}
      {isLoggedIn ? (
        location.pathname !== '/contacts' && <NavLink to="/contacts">Contacts</NavLink>
      ) : (
        <>
          {location.pathname !== '/login' && <NavLink to="/login">Login</NavLink>}
          {location.pathname !== '/login' && location.pathname !== '/register' && <span> | </span>}
          {location.pathname !== '/register' && <NavLink to="/register">Register</NavLink>}
        </>
      )}
    </nav>
  );
};

export default Navigation;
