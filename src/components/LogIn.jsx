import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import '../index.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location object

  useEffect(() => {
    if (location.state && location.state.message) {
      setInfoMessage(location.state.message);
    }
  }, [location.state]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("http://localhost:5555/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError(data.error || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred while logging in. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>WELCOME TO FitFusion</h2>
        <h1 className="login-title">Login</h1>
        {infoMessage && <div className="info-message">{infoMessage}</div>}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="login-form">
              <div className="form-group">
                <Field className="form-field" type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-group">
                <Field className="form-field" type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <button className="submit-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
              {error && <div className="error">{error}</div>}
            </Form>
          )}
        </Formik>
        <div className="link-container">
          Don't have an account? <Link to="/signup" className="link">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
