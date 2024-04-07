import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { useSelector } from 'react-redux';
import { selectAuthError } from '../../redux/auth/selectors';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const authError = useSelector(selectAuthError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showRegisterButton, setShowRegisterButton] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(7, 'Password must be at least 7 characters')
        .required('Required'),
      name: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        await dispatch(register(values)).unwrap();
        setStatus({ success: 'Registration successful!' });
        navigate('/contacts');
      } catch (error) {
        if (error.code === 11000) {
          setStatus({ error: 'Email already registered. Please log in.' });
          navigate('/login');
        } else {
          setStatus({ error: error.message || 'Registration failed!' });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleEmailKeyUp = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      formik.handleChange(e);
      if (!formik.errors.email) {
        setShowPassword(true);
      }
    }
  };
  
  const handleEmailBlur = (e) => {
    formik.handleChange(e);
    if (!formik.errors.email) {
      setShowPassword(true);
    }
  };
  
  const handlePasswordKeyUp = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      formik.validateField('password').then(() => {
        formik.handleChange(e);
        if (!formik.errors.password) {
          setShowName(true);
        }
      });
    }
  };
  
  const handlePasswordBlur = (e) => {
    formik.validateField('password').then(() => {
      formik.handleChange(e);
      if (!formik.errors.password) {
        setShowName(true);
      }
    });
  };
  
  
  const handleNameKeyUp = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      formik.handleChange(e);
      if (!formik.errors.name) {
        setShowRegisterButton(true);
      }
    }
  };
  
  const handleNameBlur = (e) => {
    formik.handleChange(e);
    if (!formik.errors.name) {
      setShowRegisterButton(true);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {authError && <div className="error">{authError.message}</div>}
      <form onSubmit={formik.handleSubmit}>
        {formik.status && formik.status.error && <div className="error form-element">{formik.status.error}</div>}
        {formik.status && formik.status.success && <div className="success form-element">{formik.status.success}</div>}

        <label htmlFor="email" className="form-element">Email Address</label>
        <input
          id="email"
          type="email"
          {...formik.getFieldProps('email')}
          className="form-aria"
          onKeyUp={handleEmailKeyUp}
          onBlur={handleEmailBlur}
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
              onKeyUp={handlePasswordKeyUp}
              onBlur={handlePasswordBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </>
        )}

        {showName && (
          <>
            <label htmlFor="name" className="form-element">Name</label>
            <input
              id="name"
              type="text"
              {...formik.getFieldProps('name')}
              className="form-aria"
              onKeyUp={handleNameKeyUp}
              onBlur={handleNameBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error form-element">{formik.errors.name}</div>
            ) : null}
          </>
        )}

        {showRegisterButton && (
           <button type="submit" className="form-element element-button">Register</button>
        )}
      </form>

      <div className="home-link-container">
        <Link to="/" className="home-link">Home</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
