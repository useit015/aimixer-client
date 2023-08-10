import './Link.scss';
import { IonButton, IonInput, IonItem } from '@ionic/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toastSet } from '../store/sliceToast';

function Link() {
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const handleLink = () => {
    
    try {
      const link = new URL(url);
    } catch(err) {
      console.error(err);
      dispatch(toastSet({color: 'danger', message: 'Invalid URL'}));
    }
    
  }

  return (
    <div className="Link">
      <div className="Link__Url">
        <IonItem>
          <IonInput placeholder="Enter link" value={url} onIonChange={(e) => setUrl(e.target.value)} />
        </IonItem>
      </div>
      <IonButton className='Link__Submit-Button' color={'primary'} onClick={() => {
        handleLink();
      }}>Submit</IonButton>
    </div>
  )
}

export default Link