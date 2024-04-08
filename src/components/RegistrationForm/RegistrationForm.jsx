import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import '../../../src/App';

const RegistrationForm = () => {
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
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(7, 'Password must be at least 7 characters').required('Required'),
      name: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        await dispatch(register(values)).unwrap();
        setStatus({ success: 'Registration successful!' });
        navigate('/contacts');
      } catch (error) {
          setStatus({ error: 'Email already registered. Please log in.' });
          navigate('/login');
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
          setShowName(true);
        } else if (field === 'name') {
          setShowRegisterButton(true);
        }
      }
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        type="email"
        {...formik.getFieldProps('email')}
        onKeyUp={(e) => handleKeyPress(e, 'email')}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      {showPassword && (
        <>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...formik.getFieldProps('password')}
            onKeyUp={(e) => handleKeyPress(e, 'password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </>
      )}

      {showName && (
        <>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...formik.getFieldProps('name')}
            onKeyUp={(e) => handleKeyPress(e, 'name')}
          />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </>
      )}

      {showRegisterButton && (
         
        <button type="submit" className="button">Register</button>
         
      )}

      {formik.status && formik.status.error && (
        <div>{formik.status.error}</div>
      )}
    </form>
  );
};

export default RegistrationForm;
