import React from 'react';
import './Login.css';
import Form from '@components/form/Form';
import { AppContext } from '@src/AppContext';

export default function Login() {
  let { setCurrentPage, setPopUpMessage } = React.useContext(AppContext);

  const handleLogin = () => {

    setPopUpMessage({
      isVisible: true,
      content: 'Login functionality is not implemented yet.',
      buttonText: 'Close',
      onClose: () => setPopUpMessage(prev => ({ ...prev, isVisible: false })),
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