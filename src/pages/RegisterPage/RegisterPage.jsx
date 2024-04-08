import { NavLink } from 'react-router-dom';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import '../../../src/App';

const RegisterPage = () => {
  return (
    <div>
      <h1>Register Page</h1>
      <RegistrationForm />
      <NavLink to="/" className="home-link">Home</NavLink>
    </div>
  );
};

export default RegisterPage;

