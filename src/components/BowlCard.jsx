import React from 'react'
import { IonButton } from '@ionic/react'
import './BowlCard.scss'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit } from 'react-icons/fi';
import * as socketService from '../socketService';
import { useSelector } from 'react-redux';

function BowlCard({bowl}) {
  const login = useSelector(state => state.login);

  const deleteBowl = () => {
    socketService.emit('deleteBowl', {id: bowl.id, token: login.token})
  }

  return (
    <div className="BowlCard">
        <h2 className="BowlCard__Name">{bowl.name}</h2>
        <p className="BowlCard__Creator">{bowl.creator}</p>
        <IonButton className='BowlCard__FillButton'>Fill</IonButton>
        <div className="BowlCard__Action-Container">
          <FiEdit color='var(--ion-color-primary)' size="1.85rem" />
          <MdOutlineDeleteOutline color="red" size="2rem" onClick={deleteBowl}/>
        </div>
    </div>
  )
}

export default BowlCard