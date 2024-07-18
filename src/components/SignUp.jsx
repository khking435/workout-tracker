import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Sign Up</h1>
              <Formik
                initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
                validationSchema={SignupSchema}
                onSubmit={(values, { setSubmitting }) => {
                  axios.post('http://localhost:5555/register', values)
                    .then(response => {
                      alert(response.data.message);
                      setSubmitting(false);
                      navigate('/login');
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
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Username</label>
                      <Field className="form-control" type="text" name="username" placeholder="Username" />
                      <ErrorMessage name="username" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <Field className="form-control" type="email" name="email" placeholder="Email" />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <Field className="form-control" type="password" name="password" placeholder="Password" />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <Field className="form-control" type="password" name="confirmPassword" placeholder="Confirm Password" />
                      <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                    </div>
                    <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Signing up...' : 'Signup'}
                    </button>
                    <div className="mt-3 text-center">
                      Already have an account? <a href="/login" className="link-primary">Login</a>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
