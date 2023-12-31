import React, { useState } from 'react'
import { IonButton } from '@ionic/react'
import './BowlCard.scss'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit } from 'react-icons/fi';
import * as socketService from '../socketService';
import { useDispatch, useSelector } from 'react-redux';
import { loginSetMode } from '../store/sliceLogin';
import { fillSetCurrentBowl } from '../store/sliceFill';
import { mixSetTopics } from '../store/sliceMix';

function BowlCard({bowl}) {
  const [mode, setMode] = useState('display');
  const [name, setName] = useState(bowl.name);

  const login = useSelector(state => state.login);
  const fill = useSelector(state => state.fill);

  const dispatch = useDispatch();

  const deleteBowl = () => {
    console.log('Delete bowl', bowl.id);
    socketService.emit('deleteBowl', {id: bowl.id, token: login.token})
  }

  const handleMainButton = () => {
    if (mode === 'display') {
      dispatch(fillSetCurrentBowl(bowl.id));
      dispatch(mixSetTopics(''))
      dispatch(loginSetMode('fill'));
    } else {
      setName(bowl.name)
      socketService.emit('updateBowlName', {name, id: bowl.id, token: login.token})
      setMode('display');
      
    }
  }

  return (
    <div className="BowlCard">
        <div className="BowlCard__Top">
          {mode === 'display' && <h2 className="BowlCard__Name">{bowl.name}</h2>}
          {mode === 'edit' && <input className="BowlCard__Input-Name" type='text' value={name} onChange={(e) => setName(e.target.value)} />}
       
        </div>

        <div className="BowlCard__Bottom">
        <p className="BowlCard__Creator">{bowl.creator}</p>
          <IonButton className='BowlCard__FillButton' fill='outline' onClick={handleMainButton}>
              {mode === 'display' ? 'Select' : 'Change'}
          </IonButton>
          <div className="BowlCard__Action-Container">
            <FiEdit color='var(--ion-color-primary)' size="1.85rem" 
            onClick={() => {
              const newMode = mode === 'display' ? 'edit' : 'display';
              setMode(newMode); 
            }} />
            <MdOutlineDeleteOutline color="var(--ion-color-danger)" size="2rem" onClick={deleteBowl}/>
          </div>
        </div>
    </div>
  )
}

export default BowlCard