import React, { useState } from 'react';
import authSvg from '../../assests/auth.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { authenticate, isAuth } from '../../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
//import { GoogleLogin } from 'react-google-login';
//import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
require("dotenv").config();

const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    textChange: 'Sign In'
  });
  const { email, password1, textChange } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  /*const sendGoogleToken = tokenId => {
    axios
      .post(`https://rotaractmora.org/awurudu-backend/api/googlelogin`, {
        idToken: tokenId
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
      })
      .catch(error => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
      });
  };
  const informParent = response => {
    authenticate(response, () => {
      isAuth() && isAuth().role === 'admin'
        ? history.push('/admin')
        : history.push('/private');
    });
  };*/

  /*const sendFacebookToken = (userID, accessToken) => {
    axios
      .post(`https://rotaractmora.org/awurudu-backend/api/facebooklogin`, {
        userID,
        accessToken
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
      })
      .catch(error => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
      });
  };
  const responseGoogle = response => {
    console.log(response);
    sendGoogleToken(response.tokenId);
  };

  const responseFacebook = response => {
    console.log(response);
    sendFacebookToken(response.userID, response.accessToken)
  };*/

  const handleSubmit = e => {
    console.log('https://rotaractmora.org/awurudu-backend/api');
    e.preventDefault();
    if (email && password1) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .post(`https://rotaractmora.org/awurudu-backend/api/login`, {
          email,
          password: password1
        })
        .then(res => {
          authenticate(res, () => {
            setFormData({
              ...formData,
              email: '',
              password1: '',
              textChange: 'Submitted'
            });
            isAuth()
              ? history.push('/home')
              : history.push('/SignIn');
            toast.success(`Hey ${res.data.user.name}, Welcome back!`);
          });
        })
        .catch(err => {
          setFormData({
            ...formData,
            email: '',
            password1: '',
            textChange: 'Sign In'
          });
          console.log(err.response);
          toast.error(err.response.data.errors);
        });
    } else {
      toast.error('Please fill all fields');
    }
  };
  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-yellow-100 text-gray-900 flex justify-center'>
        {isAuth() ? <Redirect to='/' /> : null}
        <ToastContainer />
        <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
          <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
            <div className='mt-12 flex flex-col items-center'>
              <center><h1 className='text-2xl xl:text-3xl font-extrabold'>
                Sign In<br />CAST 4 Online Aurudu</h1></center>
              <div className='w-full flex-1 mt-8 text-yellow-800'>
                <div className='flex flex-col items-center'>
                  {/*<GoogleLogin
                  clientId={`895118553272-tfh7rqmqn7pgt3e0nsp53vgk2pe2gn8v.apps.googleusercontent.com`}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  render={renderProps => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                    >
                      <div className=' p-2 rounded-full '>
                        <i className='fab fa-google ' />
                      </div>
                      <span className='ml-4'>Sign In with Google</span>
                    </button>
                  )}
                ></GoogleLogin>
                <FacebookLogin
                  appId={`312956303579972`}
                  autoLoad={false}
                  callback={responseFacebook}
                  render={renderProps => (
                    <button
                      onClick={renderProps.onClick}
                      className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                    >
                      <div className=' p-2 rounded-full '>
                        <i className='fab fa-facebook' />
                      </div>
                      <span className='ml-4'>Sign In with Facebook</span>
                    </button>
                  )}
                />*/}

                  <Link
                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-yellow-200 text-yellow-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                    to='/SignUp'
                    target='_self'
                  >
                    <i className='fas fa-user-plus fa 1x w-6  -ml-2 text-yellow-800' />
                    <span className='ml-4'>Sign Up</span>
                  </Link>
                </div>
                {/*<div className='my-12 border-b text-center'>*/}
                <div className='leading-none px-2 inline-block text-sm text-yellow-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                  {/*Or sign In with e-mail*/}
                </div>
                {/*</div>*/}
                <form
                  className='mx-auto max-w-xs relative '
                  onSubmit={handleSubmit}
                >
                  <input
                    className='w-full px-8 py-4 rounded-lg font-medium bg-yellow-100 border border-yellow-200 placeholder-yellow-500 text-sm focus:outline-none focus:border-yellow-400 focus:bg-white'
                    type='email'
                    placeholder='Email'
                    onChange={handleChange('email')}
                    value={email}
                  />
                  <input
                    className='w-full px-8 py-4 rounded-lg font-medium bg-yellow-100 border border-yellow-200 placeholder-yellow-500 text-sm focus:outline-none focus:border-yellow-400 focus:bg-white mt-5'
                    type='password'
                    placeholder='Password'
                    onChange={handleChange('password1')}
                    value={password1}
                  />
                  <button
                    type='submit'
                    className='mt-5 tracking-wide font-semibold bg-gray-800 text-gray-100 w-full py-4 rounded-lg hover:bg-yellow-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                  >
                    <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                    <span className='ml-3'>Sign In</span>
                  </button>
                  <Link
                    to='/users/password/forget'
                    className='no-underline hover:underline text-yellow-800 text-md text-right absolute right-0  mt-2'
                  >
                    Forget password?
                </Link>
                </form>
              </div>
            </div>
          </div>
          <div className='flex-1 bg-yellow-200 text-center hidden lg:flex'>
            <div
              className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
              style={{ backgroundImage: `url(${authSvg})` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;