import React from 'react';
import './Register.css';
import Form from '@components/form/Form';
import { AppContext } from '@src/AppContext';

export default function Register() {
  let { setCurrentPage } = React.useContext(AppContext);

  return (
    <div className="register">
      <Form 
        className='register-form' 
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className='form-content'>
          <input id='username' className='input' type="text" placeholder="Username" />
          <input id='password' className='input' type="password" placeholder="Password" />
          <input id='confirm-password' className='input' type="password" placeholder="Confirm Password" />
        </div>
        
        <div className='form-buttons'>
          <button type="submit" className="form-button-submit">Sign Up</button>
        </div>

        <p className='form-message'> By creating an account, you agree and accept out <a className='form-link'>Terms</a> and <a className='form-link'>Privacy Policy.</a></p>
        <p className='form-bold-message'>Already have an account? <br/> <a className='form-link' onClick={() => setCurrentPage('Login')} >Log in.</a></p>
      </Form>
    </div>
  );
}