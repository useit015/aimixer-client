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
import { RiBlenderLine } from 'react-icons/ri';
import { PiArticle } from 'react-icons/pi';
import { loginSetMode } from './store/sliceLogin';
import { TbBowl } from 'react-icons/tb';
import { GiBowlSpiral } from 'react-icons/gi';

const DesktopApp = () => {

  const login = useSelector(state => state.login);
  const toast = useSelector(state => state.toast);
  const spinner = useSelector(state => state.spinner);
  const fill = useSelector(state => state.fill);
  const bowls = useSelector(state => state.bowls);

  const curBowl = bowls.find(b => b.id == fill.currentBowl);
  console.log(toast);

  const dispatch = useDispatch();

  return (
    <IonApp>
      <IonPage>
        <IonContent>
          <div className='DesktopApp__Navigation'>
            {login.isLoggedIn && <div className={login.mode !== 'bowls' ? 'DesktopApp__Nav-Icon' : 'DesktopApp__Nav-Icon DesktopApp__Nav-Icon--selected'} onClick={() => {dispatch(loginSetMode('bowls'))}}><GiBowlSpiral color="white" /></div> }
            {login.isLoggedIn && curBowl && <div className={login.mode !== 'fill' ? 'DesktopApp__Nav-Icon' : 'DesktopApp__Nav-Icon DesktopApp__Nav-Icon--selected'} onClick={() => {dispatch(loginSetMode('fill'))}}><TbBowl color={"white"} /></div>}
            {login.isLoggedIn && curBowl && curBowl.contents.length > 0 && <div className={login.mode !== 'mix' ? 'DesktopApp__Nav-Icon' : 'DesktopApp__Nav-Icon DesktopApp__Nav-Icon--selected'} onClick={() => {dispatch(loginSetMode('mix'))}}><RiBlenderLine color="white"/></div> }
            {login.isLoggedIn && curBowl && curBowl.creations.length > 0 && <div className={login.mode !== 'jodit' ? 'DesktopApp__Nav-Icon' : 'DesktopApp__Nav-Icon DesktopApp__Nav-Icon--selected'} onClick={() => {dispatch(loginSetMode('jodit'))}}><PiArticle color="white" /></div> } 
            
          </div>
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