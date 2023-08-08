import './DesktopApp.scss';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import { IonApp, IonButton, IonContent, IonPage, IonToast, useIonToast } from '@ionic/react';
import { toastSetIsOpen, toastSetMessage } from './store/sliceToast';
import Logo from './assets/images/logo/png/logo-black.png';
import Bowls from './components/Bowls';

const DesktopApp = () => {

  const login = useSelector(state => state.login);
  const toast = useSelector(state => state.toast);

  console.log(toast);

  const dispatch = useDispatch();

  return (
    <IonApp>
      <IonPage>
        <IonContent>
          {/* <img className='DesktopApp__Logo' src={Logo} /> */}
          {!login.isLoggedIn && <Login /> }
          {login.mode === 'bowls' && <Bowls />}
          <IonToast
              isOpen={toast.isOpen}
              message={toast.message}
              onDidDismiss={() => dispatch(toastSetIsOpen(false))}
              duration={toast.duration}
              position={toast.position}
              color={toast.color}
            ></IonToast>
        </IonContent>
      </IonPage>
    </IonApp>
  )
}

export default DesktopApp