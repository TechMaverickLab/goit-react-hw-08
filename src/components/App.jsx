import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';
import Layout from './Layout';
import { refreshUser } from '../redux/auth/operations';
import { selectIsRefreshing } from '../redux/auth/selectors'; // Потрібно експортувати та використовувати правильний селектор
import './App.css';

const HomePage = lazy(() => import('../pages/Home'));
const RegisterPage = lazy(() => import('../pages/Registration'));
const LoginPage = lazy(() => import('../pages/Login'));
const ContactsPage = lazy(() => import('../pages/Contacts'));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing); // Додаємо використання селектора для стану оновлення

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <div>Loading...</div>; // Додаємо умовний рендеринг для обробки стану оновлення
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/register" 
            element={<RestrictedRoute component={RegisterPage} />}
          />
          <Route 
            path="/login" 
            element={<RestrictedRoute component={LoginPage} />}
          />
          <Route 
            path="/contacts" 
            element={<PrivateRoute><ContactsPage /></PrivateRoute>}
          />
        </Routes>
      </Layout>
    </Suspense>
  );
};

export default App;