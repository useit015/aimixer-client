import './Bowls.scss';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { store } from '../store/configStore';
import * as socketService from '../socketService';
import { IonButton, IonFab, IonFabButton, IonIcon, IonInput, IonItem } from '@ionic/react';
import { add } from 'ionicons/icons';
import { person } from 'ionicons/icons';
import BowlCard from './BowlCard';
import { toastSet } from '../store/sliceToast';

function Bowls() {
    const [name, setName] = useState('');
    const [search, setSearch] = useState('');
    const [displayByUser, setDisplayByUser] = useState(false);
    const [displayedBowls, setDisplayedBowls] = useState(null);

    const login = useSelector(state => state.login);
    const bowls = useSelector(state => state.bowls);
    const servers = useSelector(state => state.servers)
    const userBowls = bowls.filter(b => b.creator === login.email);

    const dispatch = useDispatch();

    useEffect( () => {
      setDisplayedBowls(bowls)
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
      const filtered = bowls.filter(b => {
        const inputed = e.target.value.toLowerCase()
        const creator = b.creator.toLowerCase()
        const output = b.output.toLowerCase()
        const name = b.name.toLowerCase();
        return creator.includes(inputed) || output.includes(inputed) || name.includes(inputed) || name.replaceAll(" ", "").includes(inputed.replaceAll(" ", ""))
      })

      setDisplayedBowls(filtered)
    }

    const handleSearchCancel = () => {
      setSearch("");
      setDisplayedBowls(bowls);
    }

    const addBowl = () => {
      if (!name) return dispatch(toastSet({color: 'danger', message: 'Please enter a name'}));
      socketService.emit('addBowl', {name, token: login.token})
      setName('');
    }

    const filterBowls = () => {
      setDisplayByUser(prev => !prev);
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
                <IonInput  label={displayByUser ? "Disable user view to search" : "Search for Bowl"} labelPlacement="floating" placeholder="Type bowl name" value={search} disabled={displayByUser ? "true": "false"} onInput={handleSearch}/>
                  {!search ? null :
                    <IonButton onClick={handleSearchCancel} className='BowlCard__FillButton' fill='outline'>
                        X
                    </IonButton>
                  }
            </IonItem>
              <IonButton onClick={filterBowls}>
              <IonIcon icon={person} ></IonIcon>
            </IonButton>
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
                { userBowls.map(b => {
                  return <BowlCard key={b.id} bowl={b} />
                })
                }
            </div>
        }      
    </div>
  )
}

export default Bowls