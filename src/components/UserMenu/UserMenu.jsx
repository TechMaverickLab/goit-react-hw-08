// UserMenu.jsx
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut())
      .then(() => {
        navigate('/login');
      })
      .catch(error => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <div>
      <h2>Welcome, {currentUser ? currentUser.name : 'Guest'}!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;
