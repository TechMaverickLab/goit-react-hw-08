import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { selectCurrentUser } from '../../redux/auth/selectors';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <span>Welcome, {currentUser.name}!</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;
