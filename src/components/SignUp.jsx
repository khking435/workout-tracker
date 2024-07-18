import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import '../index.css';

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Signup = () => {
  const navigate = useNavigate();  // Initialize the navigate function

  return (
    <div className="container">
      <div className="box">
        <h1 className="title">Sign Up</h1>
        <Formik
          initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            axios.post('http://localhost:5555/register', values)
              .then(response => {
                alert(response.data.message);
                setSubmitting(false);
                navigate('/login');  // Redirect to the login page after successful registration
              })
              .catch(error => {
                if (error.response) {
                  alert(error.response.data.error);
                } else {
                  alert('An error occurred');
                }
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form className="signup-form">
              <div className="form-group">
                <h2>GET AN ACCOUNT</h2>
                <Field className="form-field" type="text" name="username" placeholder="Username" />
                <ErrorMessage name="username" component="div" className="error" />
              </div>
              <div className="form-group">
                <Field className="form-field" type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-group">
                <Field className="form-field" type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <div className="form-group">
                <Field className="form-field" type="password" name="confirmPassword" placeholder="Confirm Password" />
                <ErrorMessage name="confirmPassword" component="div" className="error" />
              </div>
              <button className="submit-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Signing up...' : 'Signup'}
              </button>
              <div className="link-container">
                Already have an account? <a href="/login" className="link">Login</a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
