import './Bowls.scss';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { store } from '../store/configStore';
import * as socketService from '../socketService';
import { IonButton, IonFab, IonFabButton, IonIcon, IonInput, IonItem } from '@ionic/react';
import { add } from 'ionicons/icons';
import BowlCard from './BowlCard';

function Bowls() {
    const [name, setName] = useState('')

    const login = useSelector(state => state.login);
    const bowls = useSelector(state => state.bowls);
    const servers = useSelector(state => state.servers)


    console.log('login', login);
    console.log('bowls', bowls);


    socketService.setupTheSocket(io, `${servers.api[servers.mode]}`, store);

    const getBowls = () => {
      socketService.emit('getBowls', login.token);
    }

    useEffect(() => {
      getBowls(); 
    }, [])

    const addBowl = () => {
      socketService.emit('addBowl', {name, token: login.token})
      setName('');
    }

    return (
    <div className='Bowls'>
      <h1 className="Bowls__Title">Bowls</h1>
        <div className="Bowls__New-Container">
         
          <IonItem className='Bowls__Name'>
              <IonInput  label="New Bowl" labelPlacement="floating" placeholder="Enter name" value={name} onInput={(e) => {
                setName(e.target.value)
                }}/>
          </IonItem>
          <IonButton onClick={addBowl}>
            <IonIcon icon={add} ></IonIcon>
          </IonButton>
        </div>      
        <div className="Bowls__List">
            { bowls.map(b => {
              return <BowlCard key={b.id} bowl={b} />
            })
            }
          </div>
    </div>
  )
}

export default Bowls