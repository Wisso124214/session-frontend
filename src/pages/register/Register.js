import React from 'react';
import './Register.css';
import Form from '@components/form/Form';
import Tooltip from '@components/tooltip/Tooltip';
import { AppContext } from '@src/AppContext';
import config from '@config/config.js';
import axios from 'axios';

const { BACKEND_URL, PROJECT_URL } = config;
export default function Register() {
  let { setCurrentPage, setPopUpMessage } = React.useContext(AppContext);

  const maxValues = {
    username: 20,
    email: 50,
    password: 30,
  }

  const [listUsernames, setListUsernames] = React.useState([]);
  // Estado para el username y el mensaje de error
  const [username, setUsername] = React.useState('');
  const [usernameError, setUsernameError] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState('');

  React.useEffect(() => {
    const fetchUsernames = async () => {
      await axios.get(`${BACKEND_URL}/get-users`)
        .then(response => {
          const usernames = response.data.map(user => user.username);
          setListUsernames(usernames);
        })
        .catch(error => {
          console.error('Error fetching usernames:', error);
          setPopUpMessage({
            isVisible: true,
            content: 'Error fetching usernames. Please try again later.',
            buttonText: 'Close',
            onClose: () => setPopUpMessage(prev => ({ ...prev, isVisible: false })),
          });
        })
    }

    fetchUsernames();
  }, []);

  const handleRegister = async () => {
    //Chequear que todos los campos estén llenos
    //Chequear que todos los campos sean válidos, es decir, que los errores sean ''
    // Si todo es válido
      // Añadir a listUsernames (useState) el username (el valor por default debe ser una petición al servidor para obtener la lista de usernames)
      // Hacer la petición al servidor para registrar al usuario
      // Redirigir al usuario al frontend de la app (idealmente acá mostrará las páginas a las que puede acceder)
      // Colocar el loader mientras se hace la petición
    // Si hay algún error, mostrar el mensaje correspondiente con el pop-up

    if (!username || !email || !password || !confirmPassword) {
      setPopUpMessage({
        isVisible: true,
        content: 'Please fill in all fields.',
        buttonText: 'Close',
        onClose: () => setPopUpMessage(prev => ({ ...prev, isVisible: false })),
      });
      return;
    }

    if (usernameError || emailError || passwordError || confirmPasswordError) {
      setPopUpMessage({
        isVisible: true,
        content: 'Please fix the errors before submitting.',
        buttonText: 'Close',
        onClose: () => setPopUpMessage(prev => ({ ...prev, isVisible: false })),
      });
      return;
    }

    setListUsernames(prev => [...prev, username]);
    
    await axios.post(`${BACKEND_URL}/register`, {
      username,
      password,
      contact: email,
    })
    .then(response => {
      if (response.data.success) {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
  
        setPopUpMessage({
          isVisible: true,
          content: 'User registered successfully!',
          buttonText: 'Close',
          onClose: () => setPopUpMessage(prev => ({ ...prev, isVisible: false })),
        });

        // Get the redirect from the uri
        const urlParams = new URLSearchParams(window.location.search);
        const redirectUrl = urlParams.get('redirect');
        if (redirectUrl) {
          setTimeout(() => document.location = redirectUrl + `?username=${document.getElementById('username').value}`, 1000); // Redirect after 1 second
        }
      } else {
        setPopUpMessage({
          isVisible: true,
          content: response.data.message || 'Registration failed. Please try again.',
          buttonText: 'Close',
          onClose: () => setPopUpMessage(prev => ({ ...prev, isVisible: false })),
        });
      }
    })
    .catch(error => {
      console.error('Error registering user:', error);
      setPopUpMessage({
        isVisible: true,
        content: 'Error registering user. Please try again later.',
        buttonText: 'Close',
        onClose: () => setPopUpMessage(prev => ({ ...prev, isVisible: false })),
      });
    });
  }

  const validateUsername = (value) => {
    // Chequear que la longitud sea mayor a 6 caracteres
    // Chequear que el username no exista en la lista de usernames

    // const username = document.getElementById('username').value;
    // if (username && username.length < 6) {
    //   console.log('Username is not valid');
    //   setPopUpMessage({
    //     isVisible: true,
    //     content: 'Username must be at least 6 characters long.',
    //     buttonText: 'Close',
    //     onClose: () => setPopUpMessage(prev => ({ ...prev, isVisible: false })),
    //   });
    //   return false;
    // }

    if (value && value.length < 6 && value.length > 0) {
      return 'Username must be at least 6 characters long.';
    }
    if (listUsernames.includes(value)) {
      return 'Username already exists.';
    }

    return ''
  }

  const validateEmail = () => {
    // Chequear que el email tenga un formato válido

    const emailRegex = new RegExp('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}');
    const email = document.getElementById('email').value;

    if (email && email.length > 0 && !emailRegex.test(email)) {
      return 'Email is not valid';
    }
    return '';
  }

  const validatePassword = (text) => {
    // Chequear que la contraseña tenga al menos 8 caracteres
    // Chequear que la contraseña tenga al menos una mayúscula, una minúscula, un número y un carácter especial

    let errorText = '';
    const length = text.length > 8;
    const numberRegex = new RegExp('[0-9]');
    const uppercaseRegex = new RegExp('[A-Z]');
    const lowercaseRegex = new RegExp('[a-z]');
    const symbolRegex = /[-:+_º·$/[\]}{|~€|@#~€¬`«»%()?¿¡;.'"!@#\\$//%\\^,&\\*]/;

    //Regex to number (rtn)
    const rtn = (regex) => regex.test(text) ? 1 : 0;

    const safety = rtn(symbolRegex) + rtn(lowercaseRegex) + rtn(uppercaseRegex) + rtn(numberRegex) + length;
    // safety <= 3 ? setPasswordState('low') : safety < 5 ? setPasswordState('medium') : setPasswordState('high');

    if (text.length > 0) {
      if (text.length < 8) {
        errorText = 'Must have at least 8 characters'
      } else if (!uppercaseRegex.test(text)) {
        errorText = 'Must contain at least one uppercase letter'
      } else if (!lowercaseRegex.test(text)) {
        errorText = 'Must contain at least one lowercase letter'
      } else if (!numberRegex.test(text)) {
        errorText = 'Must contain at least one number'
      } else if (!symbolRegex.test(text)) {
        errorText = 'Must contain at least one symbol'
      } else {
        errorText = '';
      }
    }
    return errorText;
  }

  const validateConfirmPassword = (text) => {
    // Chequear que la contraseña de confirmación sea igual a la contraseña

    if (text !== password) {
      return 'Passwords do not match';
    }
    return '';
  }
    

  return (
    <div className="register">
      <Form 
        adjustableWidth={false}
        className='register-form' 
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className='form-inputs'>
          { /* Hacer a mano un div de clase container-input que 
          tenga a un tooltip con su input de hijos */}

            {/** Ajustar el ancho del input y todos sus padres hasta el forms-input */}
            <Tooltip 
              text={usernameError} 
              mode='visibility' 
              visibility={usernameError !== ''}
              contentStyle={{ 
                backgroundColor: 'var(--invalid-color)',
                color: 'var(--text-color-dark)',
                fontWeight: 'bold',
              }}
              container_props={{
                style: { width: '85%' }
              }}
            >
              <div className='container-input'>
                <input
                  id='username'
                  className='input'
                  maxLength={maxValues.username}
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameError(validateUsername(e.target.value));
                  }}
                />
              </div>
            </Tooltip>
            <Tooltip 
              text={emailError} 
              mode='visibility' 
              visibility={emailError !== ''}
              contentStyle={{ 
                backgroundColor: 'var(--invalid-color)',
                color: 'var(--text-color-dark)',
                fontWeight: 'bold',
              }}
              container_props={{
                style: { width: '85%' }
              }}
            >
              <div className='container-input'>
                <input 
                  id='email' 
                  className='input'
                  maxLength={maxValues.email}
                  type="email" 
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(validateEmail(e.target.value));
                  }}
                />
              </div>
          </Tooltip>
          <Tooltip 
            text={passwordError} 
            mode='visibility' 
            visibility={passwordError !== ''}
            contentStyle={{ 
              backgroundColor: 'var(--invalid-color)',
              color: 'var(--text-color-dark)',
              fontWeight: 'bold',
            }}
            container_props={{
              style: { width: '85%' }
            }}
          >
            <div className='container-input'>
              <input 
                id='password' 
                className='input'
                maxLength={maxValues.password}
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(validatePassword(e.target.value));
                }}
              />
            </div>
          </Tooltip>
          <Tooltip 
            text={confirmPasswordError} 
            mode='visibility' 
            visibility={confirmPasswordError !== ''}
            contentStyle={{ 
              backgroundColor: 'var(--invalid-color)',
              color: 'var(--text-color-dark)',
              fontWeight: 'bold',
            }}
            container_props={{
              style: { width: '85%' }
            }}
          >
            <div className='container-input'>
              <input 
                id='confirm-password' 
                className='input'
                maxLength={maxValues.password}
                type="password" 
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError(validateConfirmPassword(e.target.value));
                }}
              />
            </div>
          </Tooltip>
        </div>

        <div className='form-buttons'>
          <button type="submit" className="form-button-submit" onClick={handleRegister}>Sign Up</button>
        </div>

        <p className='form-message'> By creating an account, you agree and accept out <div className='form-link'>Terms</div> and <div className='form-link'>Privacy Policy.</div></p>
        <p className='form-bold-message' style={{paddingTop: '.5rem'}}>Already have an account? <br/> <div className='form-link' onClick={() => setCurrentPage('Login')} >Log in.</div></p>
      </Form>
    </div>
  );
}