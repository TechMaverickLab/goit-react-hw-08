import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/authOperations';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const userData = await dispatch(login(values)).unwrap();
        localStorage.setItem('token', userData.token);
        navigate('/contacts');
      } catch (error) {
        const errorMessage = 'Invalid email or password';
        setStatus({ error: errorMessage });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleKeyPress = (e, field) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      formik.handleChange(e);
      if (!formik.errors[field]) {
        if (field === 'email') {
          setShowPassword(true);
        } else if (field === 'password') {
          setShowLoginButton(true);
        }
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email" className="form-element">Email Address</label>
        <input
          id="email"
          type="email"
          {...formik.getFieldProps('email')}
          className="form-aria"
          onKeyUp={(e) => handleKeyPress(e, 'email')}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error form-element">{formik.errors.email}</div>
        ) : null}

        {showPassword && (
          <>
            <label htmlFor="password" className="form-element">Password</label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps('password')}
              className="form-aria"
              onKeyUp={(e) => handleKeyPress(e, 'password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error form-element">{formik.errors.password}</div>
            ) : null}
          </>
        )}

        {showLoginButton && (
          <button type="submit" className="form-element element-button">Login</button>
        )}

        {formik.status && formik.status.error && (
          <div className="error form-element">{formik.status.error}</div>
        )}
      </form>

      <div className="home-link-container">
        <Link to="/" className="home-link">Home</Link>
      </div>
    </div>
  );
};

export default LoginPage;
