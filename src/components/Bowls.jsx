import './Bowls.scss';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { store } from '../store/configStore';
import * as socketService from '../socketService';
import { IonButton, IonFab, IonFabButton, IonIcon, IonInput, IonItem } from '@ionic/react';
import { add } from 'ionicons/icons';
import { basket } from 'ionicons/icons';
import BowlCard from './BowlCard';
import { toastSet } from '../store/sliceToast';

function Bowls() {
    const [name, setName] = useState('');
    const [search, setSearch] = useState('');
    const [displayByUser, setDisplayByUser] = useState(true);
    const [displayedBowls, setDisplayedBowls] = useState(null);
    const [filterdBowls, setFilteredBowls] = useState(null);

    const login = useSelector(state => state.login);
    const bowls = useSelector(state => state.bowls);
    const servers = useSelector(state => state.servers)
    const userBowls = useSelector(state => state.bowls.filter(b => b.creator === login.email))

    const dispatch = useDispatch();

    useEffect( () => {
      setDisplayedBowls(bowls);
      setFilteredBowls(userBowls);
    }, [bowls])    

    socketService.setupTheSocket(io, `${servers.api[servers.mode]}`, store);

    const getBowls = () => {
      socketService.emit('getBowls', login.token);
    }

    useEffect(() => {
      getBowls(); 
    }, [])
   
    const handleSearch = (e) => {
      setSearch(e.target.value);
      const bowlsToSearch = displayByUser ? userBowls : bowls;
      const filtered = bowlsToSearch.filter(b => {
        const inputed = e.target.value.toLowerCase()
        const creator = b.creator.toLowerCase()
        const output = b.output.toLowerCase()
        const name = b.name.toLowerCase();
        return creator.includes(inputed) || output.includes(inputed) || name.includes(inputed) || name.replaceAll(" ", "").includes(inputed.replaceAll(" ", ""))
      })

      if (!displayByUser) setDisplayedBowls(filtered)
      if (displayByUser) setFilteredBowls(filtered)
    }

    const handleSearchCancel = () => {
      setSearch("");
      if (!displayByUser) setDisplayedBowls(bowls)
      if (displayByUser) setFilteredBowls(userBowls)
    }

    const addBowl = () => {
      if (!name) return dispatch(toastSet({color: 'danger', message: 'Please enter a name'}));
      socketService.emit('addBowl', {name, token: login.token})
      setName('');
    }

    const filterBowls = () => {
      setSearch("");
      setDisplayByUser(prev => !prev);
      if (!displayByUser) setDisplayedBowls(bowls)
      if (displayByUser) setFilteredBowls(userBowls)
    }

    if (!displayedBowls) return null;

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
        <div className='Bowls__Search'>
          <IonItem className='Bowls__Search-Field'>
                <IonInput  label="Search for Bowl" labelPlacement="floating" placeholder="Type bowl name" value={search} onInput={handleSearch}/>
                  {!search ? null :
                    <IonButton onClick={handleSearchCancel} className='BowlCard__FillButton' fill='outline'>
                        X
                    </IonButton>
                  }
            </IonItem>
              <IonButton>
              <IonIcon icon={basket} ></IonIcon>
            </IonButton>
        </div>
        <div className='Bowls__Checkbox'>
            <ion-checkbox onInput={filterBowls} labelPlacement="start">See all company bowls</ion-checkbox>
        </div>
        {!displayByUser ? 
            <div className="Bowls__List">
              { displayedBowls.map(b => {
                  return <BowlCard key={b.id} bowl={b} />
              })
              }
            </div>
        :
            <div className="Bowls__List">
                { filterdBowls.map(b => {
                  return <BowlCard key={b.id} bowl={b} />
                })
                }
            </div>
        }      
    </div>
  )
}

export default Bowls