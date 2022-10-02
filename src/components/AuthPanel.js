import React, { useContext, useState } from 'react';
import { Button, Tabs, Tab, Input } from '@react95/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
  confirmPassword: Yup.string()
    .min(6, 'Too Short!')
    .max(15, 'Too Long!')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthPanel = ({ setIsVerifyEmailOpen, setIsAuth, alertMethods }) => {
  const error = 'error';
  const [authError, setAuthError] = useState('');
  const { setType, setTitle, setContent, toggleShowAlert } = alertMethods;

  function login(email, password) {
    console.log('signin');

    signInWithEmailAndPassword(auth, email, password)
      .then(cred => {
        console.log(cred, 'CRED');
        setIsAuth(true);
      })
      .catch(err => {
        console.log(err.code, 'errCode');
        switch (err.code) {
          case 'auth/email-already-in-use':
            setAuthError('Email is Already Used');
            setContent('Email is Already Used');
            setTitle('Forgot Your Old Account?');
            toggleShowAlert(true);
            return;
          case 'auth/invalid-credential':
            setAuthError('Email or Password is Incorrect');
            setContent('Email or Password is Incorrect');
            setTitle('Authentication');
            toggleShowAlert(true);

            return;
          case 'auth/internal-error':
            setAuthError('Something went wrong');
            setContent('Something went wrong');
            setTitle('System Error');
            setType('warning');

            toggleShowAlert(true);

            return;
          case 'auth/wrong-password':
            setAuthError('Email or Password is Incorrect');
            setContent('Email or Password is Incorrect');
            setTitle('Authentication');
            toggleShowAlert(true);

            return;
          case 'auth/too-many-requests':
            setAuthError('Too Many Tries, Slow Down');
            setContent('Too Many Tries, Slow Down');
            setTitle('Timeout');
            setType('warning');
            toggleShowAlert(true);

            return;
          default:
            toggleShowAlert(true);
            setContent(err.code);
        }
      });
  }

  function signup(email, password) {
    console.log('signup');
    createUserWithEmailAndPassword(auth, email, password)
      .then(cred => {
        console.log(cred, 'CRED');
        setIsAuth(true);
      })
      .catch(err => {
        console.log(err.code, 'errCode');
        switch (err.code) {
          case 'auth/email-already-in-use':
            setAuthError('Email is Already Used');
            setContent('Email is Already Used');
            setTitle('Forgot Your Old Account?');
            toggleShowAlert(true);
            return;
          case 'auth/internal-error':
            setAuthError('Something went wrong');
            setContent('Something went wrong');
            setTitle('System Error');
            setType('warning');

            toggleShowAlert(true);
            return;
          case 'auth/too-many-requests':
            setAuthError('Too Many Tries, Slow Down');
            setContent('Too Many Tries, Slow Down');
            setTitle('Timeout');
            setType('warning');
            toggleShowAlert(true);
            return;
          default:
            setContent('');
        }
      });
  }

  return (
    <div className="center">
      <Tabs style={{ width: 350 }} defaultActiveTab="Sign In">
        <Tab title="Sign In">
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              login(values.email, values.password);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field type="email" name="email" className="inputLabel" />
                <ErrorMessage name="email" component="div" className="error" />
                <Field type="password" name="password" className="inputLabel" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
                <button type="submit" disabled={isSubmitting}>
                  Sign In
                </button>
              </Form>
            )}
          </Formik>
        </Tab>
        <Tab title="Sign Up">
          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
            }}
            // validationSchema={SignupSchema}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              signup(values.email, values.password);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <div>
                <main className="login">
                  <Form className="login__landing">
                    <header>
                      <h2>Register</h2>
                      <p>Welcome to ACM @UCM</p>
                    </header>

                    <Field
                      className="input"
                      id="email"
                      placeholder="Email"
                      name="email"
                      type="email"
                    />
                    <ErrorMessage name="email" />

                    <Field
                      className="input"
                      id="password"
                      placeholder="Password"
                      name="password"
                      type="password"
                    />
                    <ErrorMessage name="password" />

                    <Field
                      className="input"
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                    />
                    <ErrorMessage name="confirmPassword" />

                    {/* <Field name="major" component={SearchDropdown} options={majors} />
              <ErrorMessage name="major" />

              <Field
                name="gradYear"
                component={SearchDropdown}
                options={gradYears}
              />
              <ErrorMessage name="gradYear" /> */}

                    <button type="submit" disabled={isSubmitting}>
                      Sign Up
                    </button>
                  </Form>
                </main>
              </div>
            )}
          </Formik>
        </Tab>
      </Tabs>
    </div>
  );
};

export default AuthPanel;
