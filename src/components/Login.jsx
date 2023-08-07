import { IonButton, IonCheckbox, IonInput, IonItem } from '@ionic/react';
import './Login.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSetMode } from '../store/sliceLogin';
import axios from 'axios';

const Login = () => {

  const login = useSelector(state => state.login);
  const dispatch = useDispatch();

  const handleSubmit = async () => {

    switch (login.mode) {
      case 'login':
        break;
      case 'register':
        break;
    }

  }

  return (
    <div className='Login'>
      <h1 className='Login__Heading'>AI Mixer</h1>
      <div className='Login__Container'>
        <div className="Login__Modal">
          {login.mode === 'login' && <h1 className="Login__Title">Login</h1>}
          {login.mode === 'register' && <h1 className="Login__Title">Register</h1>}
          {login.mode === 'register' && <IonItem>
            <IonInput className='Login__Input' label="Email" labelPlacement="floating" placeholder="Enter text"></IonInput>
          </IonItem>}

          <IonItem>
            <IonInput className='Login__Input' label="Username" labelPlacement="floating" placeholder="Enter text"></IonInput>
          </IonItem>
          <IonItem>
            <IonInput className='Login__Input' label="Password" type="password" labelPlacement="floating" placeholder="Enter text"></IonInput>
          </IonItem>
          {login.mode === 'register' && <IonItem>
            <IonInput className='Login__Input' label="Confirmation Password" type="password" labelPlacement="floating" placeholder="Enter text"></IonInput>
          </IonItem>}

          {login.mode === 'register' && <IonCheckbox className='Login__Checkbox' labelPlacement="end"><b>Company Account:</b> Allow all @pymnts.com</IonCheckbox>}
          
          <IonButton className='Login__Submit-Button'>Submit</IonButton>
          
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