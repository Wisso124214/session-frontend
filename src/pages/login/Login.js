import React from 'react';
import './Login.css';
import Form from '@components/form/Form';
import { AppContext } from '@src/AppContext';
import config from '@config/config.js';
import axios from 'axios';

const { BACKEND_URL, PROJECT_URL } = config;

export default function Login() {
  let { setCurrentPage, setPopUpMessage } = React.useContext(AppContext);

  const handleLogin = async () => {

    await axios.post(`${BACKEND_URL}/login`, {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
    })
    .then(response => {
      if (response.data.success) {
        setPopUpMessage({
          isVisible: true,
          content: 'Login successful! Redirecting...',
          buttonText: 'Close',
          onClose: () => setPopUpMessage(prev => ({ ...prev, isVisible: false })),
        });

        setTimeout(() => document.location = PROJECT_URL + `?username=${document.getElementById('username').value}`, 1000); // Redirect after 1 second

      } else {
        // Handle login failure
        setPopUpMessage({
          isVisible: true,
          content: response.data.message || 'Login failed. Please try again.',
          buttonText: 'Close',
          onClose: () => setPopUpMessage(prev => ({ ...prev, isVisible: false })),
        });
      }
    })
    .catch(error => {
      console.error('Login error:', error);
      setPopUpMessage({
        isVisible: true,
        content: error.response?.data?.message || 'An error occurred during login. Please try again.',
        buttonText: 'Close',
        onClose: () => setPopUpMessage(prev => ({ ...prev, isVisible: false })),
      });
    });
  }

  return (
    <div className="login">
      <Form 
        className='login-form' 
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className='form-inputs'>
          <input id='username' className='input' type="text" placeholder="Username" />
          <input id='password' className='input' type="password" placeholder="Password" />
        </div>
        
        <div className='form-buttons'>
          <button type="submit" className="form-button-submit" style={{marginTop: '2rem'}} onClick={handleLogin} >Log In</button>
        </div>

        <div className='form-link' style={{marginTop: '.7rem'}} >Forgot Password?</div>
        <p className='form-bold-message'>You don't have an account? <br/><div className='form-link' onClick={() => setCurrentPage('Register')} >Sign up.</div></p>
      </Form>
    </div>
  );
}