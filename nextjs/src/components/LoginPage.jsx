import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';
import { GoogleOAuthProvider } from '@react-oauth/google';

// import './LoginPage.css';

export default function Login(prop) {
  const [user, setUser] = useState(null);

  const router = useRouter();

  //   useEffect(() => {
  //     if(sessionStorage.getItem('user')!==null){
  //     const storedUser = JSON.parse(sessionStorage.getItem('user'));
  //     }
  //     if (storedUser) {
  //       setUser(storedUser);
  //     }
  //   }, []);

  const handleGoogleLogin = (response) => {
    setUser(response);
    let pushValue = prop?.fields?.CTALogin?.value?.href;

    router.push(pushValue);
    sessionStorage.setItem('user', JSON.stringify(response));
  };

  const handleGoogleError = (error) => {
    console.log('Google login error:', error);
  };

  const handleGoogleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is require'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission logic here
    console.log('Form submitted:', values);
    setSubmitting(false);
  };

  return (
    <GoogleOAuthProvider clientId="618308078268-cmu3eaighlc56t3bukdm13g7b66o7ii0.apps.googleusercontent.com">
      <>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 col-sm-10">
              <h2 className="text-center mb-4 fade-in">Welcome to the Login Portal!</h2>
              <div className="d-flex justify-content-center">
                <div className="Login">
                  <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="form-group">
                          <label>Email</label>
                          <Field type="email" name="email" className="form-control" />
                          <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                          <label>Password</label>
                          <Field type="password" name="password" className="form-control" />
                          <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                        <button
                          className="btn btn-primary btn-lg btn-block"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                      </Form>
                    )}
                  </Formik>
                  <div className="google-btn">
                    {!user && (
                      <GoogleLogin
                        onSuccess={() => handleGoogleLogin()}
                        onError={() => handleGoogleError()}
                      />
                    )}
                    {user && (
                      <div>
                        <p>Welcome, {user.name}!</p>
                        <button className="btn btn-danger" onClick={handleGoogleLogout}>
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </GoogleOAuthProvider>
  );
}
