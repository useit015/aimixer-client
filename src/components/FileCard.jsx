import { IonButton, IonDatetime } from "@ionic/react";
import "./FileCard.scss";
import React, { useState } from 'react';
import { DateTime } from "luxon";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit } from 'react-icons/fi';

function FileCard({file, deleteFile}) {
    const [showPicker, setShowPicker] = useState(false);
    const [ISODate, setISODate] = useState(DateTime.fromMillis(file.lastModified).toISODate());
    const [mode, setMode] = useState('display');
    let loc = file.name.lastIndexOf('.');
    let initName = file.name.substr(0, loc).replaceAll(/[-\_]/g, ' ');
    const [name, setName] = useState(initName);

    console.log('lastModified', file.lastModified)

    const handleMainButton = () => {

    }
 

  return (
    <div className="FileCard">
        {mode === 'display' && <h2 className="FileCard__Name" onClick={() => setMode('edit')}>{name}</h2>}
        {mode === 'edit' && <textarea rows={4} className="FileCard__Input-Name" type='text' value={name} onChange={(e) => setName(e.target.value)} />}
        <IonButton className='FileCard__Button-Date' onClick={() => {
              const curVal = showPicker;
              setShowPicker(!curVal)
              }}>{DateTime.fromISO(ISODate).toFormat('MMMM dd, yyyy')}
        </IonButton>
        {showPicker && <IonDatetime className='FileCard__Date-Picker' value={ISODate} presentation='date' onIonChange={(e) => setISODate(e.target.value)}></IonDatetime>}
        <IonButton className='BowlCard__FillButton' onClick={handleMainButton}>
            {'Add'}
        </IonButton>
        <div className="FileCard__Action-Container">
          <FiEdit color='var(--ion-color-primary)' size="1.85rem" 
          onClick={() => {
            const newMode = mode === 'display' ? 'edit' : 'display';
            setMode(newMode); 
          }} />
          <MdOutlineDeleteOutline color="var(--ion-color-danger)" size="2rem" onClick={() => deleteFile(file.id)}/>
        </div>
    </div>
        
  )
}

export default FileCard