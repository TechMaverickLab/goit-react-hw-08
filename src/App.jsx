import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import PrivateRoute from './components/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute';
import Layout from './components/Layout/Layout';
import { refreshUser } from './redux/auth/operations';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/register" 
              element={
                <RestrictedRoute component={RegisterPage} />
              } 
            />
            <Route 
              path="/login" 
              element={
                <RestrictedRoute component={LoginPage} />
              } 
            />
            <Route 
              path="/contacts" 
              element={
                <PrivateRoute>
                  <ContactsPage />
                </PrivateRoute>
              } 
            />
          </Routes>
        </Layout>
      </Suspense>
    </div>
  );
};

export default App;
