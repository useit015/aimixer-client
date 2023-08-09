import { IonButton, IonCheckbox, IonInput, IonItem } from '@ionic/react';
import './Login.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSetConfirmPassword, loginSetEmail, loginSetIsCorporateAccount, loginSetMode, loginSetPassword, loginSetToken, loginSetUsername } from '../store/sliceLogin';
import axios from 'axios';
import { toastSet, toastSetIsOpen, toastSetMessage } from '../store/sliceToast';
import * as EmailValidator from 'email-validator';

const Login = () => {

  const login = useSelector(state => state.login);
  const toast = useSelector(state => state.toast);

  let domain;
  if (!login.email) domain = '';
  else {
    const loc = login.email.indexOf('@');
    if (loc === -1) domain = '';
    else domain = login.email.substr(loc)
  }

  const dispatch = useDispatch();

  const loginUser = () => {
    const { username, password } = login;

    if (!username) return dispatch(toastSet({position: 'middle', message: 'Username Required', color: 'danger'}))
    if (!password) return dispatch(toastSet({position: 'middle', message: 'Password Required', color: 'danger'}))
   
    const request = {
      url: `https://account.aimixer.io:5001/login`,
      method: 'post',
      data: {
        username, password
      }
    }
    axios(request)
    .then(response => {
      const { status } = response.data;
      if (status === 'error') return dispatch(toastSet({position: 'middle', message: msg, color: 'danger'}));
      if (status === 'expired') {
        dispatch(toastSet({position: 'middle', message: 'Account has expired.', color: 'danger'}));
        setTimeout(() => {
          dispatch(loginSetMode('purchase'))
        }, 5000);
        return;
      }
      const { token, server, username, email, accountId, domain } = response.data;
      console.log('token and server', token, server);
      // connect to server
      dispatch(loginSetToken(loginSetToken({token, server, username, email, accountId, domain})));
    })
    .catch(err => {
      console.error(err);
    })

  }

  const registerUser = () => {
   
    const { username, password, confirmPassword, email, isCorporateAccount } = login;

    if (!email) return dispatch(toastSet({position: 'middle', message: 'Email Required', color: 'danger'}))
    if (!EmailValidator.validate(email)) return dispatch(toastSet({position: 'middle', message: 'Invalid Email', color: 'danger'}))
    if (!username) return dispatch(toastSet({position: 'middle', message: 'Username Required', color: 'danger'}))
    if (!password) return dispatch(toastSet({position: 'middle', message: 'Password Required', color: 'danger'}))
    if (password !== confirmPassword) return  dispatch(toastSet({position: 'middle', message: 'Passwords do not match', color: 'danger'}))

    const request = {
      url: `https://account.aimixer.io:5001/register`,
      method: 'post',
      data: {
        username, password, email, isCorporateAccount
      }
    }
    axios(request)
    .then(response => {

    })
    .catch(err => {
      console.error(err);
    })
  }

  const handleSubmit = async () => {

    switch (login.mode) {
      case 'login':
        loginUser();
        break;
      case 'register':
        registerUser();
        break;
    }

  }

  return (
    <div className='Login'>
      <div className='Login__Container'>
        <div className="Login__Modal">
          {login.mode === 'login' && <h1 className="Login__Title">Login</h1>}
          {login.mode === 'register' && <h1 className="Login__Title">Register</h1>}
          {login.mode === 'register' && <IonItem>
            <IonInput className='Login__Input' label="Email" labelPlacement="floating" placeholder="Enter text" value={login.email} onInput={(e) => dispatch(loginSetEmail(e.target.value))} />
          </IonItem>}

          <IonItem>
            <IonInput className='Login__Input' label="Username" labelPlacement="floating" placeholder="Enter text" value={login.username} onInput={(e) => {
              dispatch(loginSetUsername(e.target.value))
              }}/>
          </IonItem>

          <IonItem>
            <IonInput className='Login__Input' label="Password" type="password" labelPlacement="floating" placeholder="Enter text" value={login.password} onInput={(e) => dispatch(loginSetPassword(e.target.value))}></IonInput>
          </IonItem>
          
          {login.mode === 'register' && <IonItem>
            <IonInput className='Login__Input' label="Confirmation Password" type="password" labelPlacement="floating" placeholder="Enter text" value={login.confirmPassword} onInput={(e) => dispatch(loginSetConfirmPassword(e.target.value))}></IonInput>
          </IonItem>}

          {login.mode === 'register' && <IonCheckbox className='Login__Checkbox' labelPlacement="end" onIonChange={(e) => {
            dispatch(loginSetIsCorporateAccount(e.target.checked))
            }}><b>Company Account:</b> Allow all {domain}</IonCheckbox>}
          
          <IonButton className='Login__Submit-Button' onClick={handleSubmit}>Submit</IonButton>
          
          {login.mode === 'login' && <IonButton className='Login__Submit-Button' fill='outline'
          onClick={() => dispatch(loginSetMode('register'))}
          >
            Register
          </IonButton> 
          }

          {login.mode === 'register' && <IonButton 
          className='Login__Submit-Button' 
          fill='outline'
          onClick={() => dispatch(loginSetMode('login'))}>
            Login
          </IonButton>
          }

        
        </div>
      </div>
    </div>
  )
}

export default Login