import './DesktopApp.scss';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import { IonApp, IonButton, IonContent, IonPage, IonToast, useIonToast } from '@ionic/react';
import { toastSetIsOpen, toastSetMessage } from './store/sliceToast';
import Logo from './assets/images/logo/svg/logo-no-background.svg';
import Bowls from './components/Bowls';
import Fill from './components/Fill';
import GridLoader from 'react-spinners/GridLoader';
import Mix from './components/Mix';
import BasicTextEditor from './components/BasicTextEditor';
import Jodit from './components/Jodit';

const DesktopApp = () => {

  const login = useSelector(state => state.login);
  const toast = useSelector(state => state.toast);
  const spinner = useSelector(state => state.spinner);

  console.log(toast);

  const dispatch = useDispatch();

  return (
    <IonApp>
      <IonPage>
        <IonContent>
          <img className='DesktopApp__Logo' src={Logo} />
          <div className="DesktopApp__Catch-Phrase">Mix Anything into Anything</div>
          {!login.isLoggedIn && <Login /> }
          {login.mode === 'bowls' && <Bowls />}
          {login.mode === 'fill' && <Fill />}
          {login.mode === 'mix' && <Mix />}
          {login.mode === 'basicEditor' && <BasicTextEditor />}
          {login.mode === 'jodit' && <Jodit />}
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
      {spinner.status && <div style={{height: '100vh', width: '100vw', position: 'fixed', top: '0', left: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100}}>
          <GridLoader color='var(--ion-color-primary)' height='3rem' />
      </div> }
    </IonApp>
  )
}

export default DesktopApp