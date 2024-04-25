import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContactForm from '../TaskForm/TaskForm';
import ContactList from '../TaskList/TaskList';
import SearchBox from '../SearchBox/SearchBox';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { fetchContacts } from '../../redux/contacts/operations';
import { selectContactsError } from '../../redux/contacts/selectors';

const Contacts = () => {
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const error = useSelector(selectContactsError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      dispatch(fetchContacts());
    }
  }, [isAuthenticated, navigate, dispatch]);

  
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Contacts Book</h1>
      <ContactForm />
      <SearchBox />
      
      <ContactList />
    </div>
  );
};

export default Contacts;