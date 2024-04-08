import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import SearchBox from '../SearchBox/SearchBox';
import LogoutButton from '../LogoutButton';
import { selectIsAuthenticated } from '../../redux/auth/selectors';
import { fetchContacts } from '../../redux/contacts/operations';

const Contacts = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      dispatch(fetchContacts());
    }
  }, [isAuthenticated, navigate, dispatch]);

  return (
    <div>
      <h1>Contacts Book</h1>
      <LogoutButton />
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
};

export default Contacts;
