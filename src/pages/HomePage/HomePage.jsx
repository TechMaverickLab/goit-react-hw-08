import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Contacts Book App</h1>
      <p>This is the home page of your application.</p>
      <Link to="/register">Register</Link> | <Link to="/login">Log In</Link>
    </div>
    
  );
};

export default HomePage;
