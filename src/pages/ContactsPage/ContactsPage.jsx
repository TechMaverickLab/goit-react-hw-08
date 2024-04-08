import { NavLink } from 'react-router-dom';
import Contacts from '../../components/Contacts/Contacts';

const ContactsPage = () => {
  return (
    <div>
      <Contacts />
      <NavLink to="/" className="home-link">Home</NavLink>
    </div>
  );
};

export default ContactsPage;

