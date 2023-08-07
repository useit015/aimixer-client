import { IonButton, IonInput, IonItem } from '@ionic/react';
import './Login.scss';
import React from 'react';
import { useSelector } from 'react-redux';


function Login() {

  const login = useSelector(state => state.login);

  const handleSubmit = () => {

  }

  const handleRegister = () => {

  }

  return (
    <div className='Login Login__Container'>
      <div className="Login__Modal">
        <h1 className="Login__Title">Login</h1>
        <IonItem>
          <IonInput className='Login__Input' label="Email" labelPlacement="floating" placeholder="Enter text"></IonInput>
        </IonItem>
        <IonItem>
          <IonInput className='Login__Input' label="Password" type="password" labelPlacement="floating" placeholder="Enter text"></IonInput>
        </IonItem>
        <IonButton className='Login__Submit-Button'>Submit</IonButton>
        
        {login.mode === 'login' && <IonButton className='Login__Submit-Button' fill='outline'>Register</IonButton> }

        {login.mode === 'register' && <IonButton className='Login__Submit-Button' fill='outline'>Login</IonButton>}
      </div>
    </div>
  )
}

export default Login