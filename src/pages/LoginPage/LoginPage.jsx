import { NavLink } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import '../../../src/App';

const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm />
      <NavLink to="/" className="home-link">Home</NavLink>
    </div>
  );
};

export default LoginPage;
