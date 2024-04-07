import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/auth/slice';
import { selectCurrentUser } from '../redux/auth/selectors'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const LogoutButton = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = ''; 
    navigate('/login'); 
  };

  return (
    <div>
      {currentUser && <span>Welcome, {currentUser.name}!</span>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
