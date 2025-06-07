import React from 'react';
import './Login.css';
import Form from '@components/form/Form';
import { AppContext } from '@src/AppContext';

export default function Login() {
  let { setCurrentPage } = React.useContext(AppContext);

  return (
    <div className="login">
      <Form 
        className='login-form' 
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className='form-content'>
          <input id='username' className='input' type="text" placeholder="Username" />
          <input id='password' className='input' type="password" placeholder="Password" />
        </div>
        
        <div className='form-buttons'>
          <button type="submit" className="form-button-submit">Log In</button>
        </div>

        <a className='form-link' style={{marginTop: '.7rem'}} >Forgot Password?</a>
        <p className='form-bold-message'>You don't have an account? <br/><a className='form-link' onClick={() => setCurrentPage('Register')} >Sign up.</a></p>
      </Form>
    </div>
  );
}