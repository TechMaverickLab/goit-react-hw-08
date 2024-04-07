import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import SearchBox from '../../components/SearchBox/SearchBox';
import LogoutButton from '../../components/LogoutButton';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../redux/auth/authSelectors';
import { Link } from 'react-router-dom';

const ContactsPage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
       
      <h1>Contacts Book</h1>
      <LogoutButton />
      <ContactForm />
      <SearchBox />
      <ContactList />

      <div className="home-link-container">
        <Link to="/" className="home-link">Home</Link>
      </div>
    </div>
  );
};

export default ContactsPage;
