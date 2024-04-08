import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import '../../../src/App';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

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
        await dispatch(login(values)).unwrap();
        navigate('/contacts');
      } catch (error) {
        console.error('Error in login:', error);
        setStatus({ error: 'Invalid email or password' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
  };

  const handleKeyPress = (e, field) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      formik.handleChange(e);
      if (!formik.errors[field]) {
        setShowPassword(true);
      }
    }
    if (field === 'password' && e.key === 'Enter') {
      setPasswordTouched(true);
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
            onBlur={handlePasswordBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </>
      )}

      {passwordTouched && (
        <button type="submit" className="button">Login</button>

      )}

      {formik.status && formik.status.error && (
        <div>{formik.status.error}</div>
      )}
    </form>
  );
};

export default LoginForm;
