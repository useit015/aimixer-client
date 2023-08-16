import './Link.scss';
import { IonButton, IonInput, IonItem } from '@ionic/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toastSet } from '../store/sliceToast';
import { spinnerSetStatus } from '../store/sliceSpinner';
import * as socketService from '../socketService';
import axios from 'axios';

function Link() {
  const [url, setUrl] = useState('');
  const fill = useSelector(state => state.fill);
  const login = useSelector(state => state.login);
  const dispatch = useDispatch();

  const addToBowl = async (link) => {
    dispatch(spinnerSetStatus(true));
    console.log(login.accountId, fill.currentBowl, link);

    const request = {
      url: `https://assets.aimixer.io:5002/urlToText`,
      method: 'post',
      data: {
        url: link,
        token: login.token,
        accountId: login.accountId,
        bowlId: fill.currentBowl,
      }
    }

    try {
      const response = await axios(request);
      if (response.data.status !== 'success') {
        dispatch(spinnerSetStatus(false));
        dispatch(toastSet({color: 'danger', message: response.data.msg}));
        return;
      }

      const { title, date, link, type, subtype, length, id, origURL } = response.data;
      socketService.emit('addContentToBowl', {token: login.token, bowlId: fill.currentBowl, content: {title, date, link, type, subtype, id, length, origURL: link}});

    } catch(err) {
        dispatch(spinnerSetStatus(false));
        dispatch(toastSet({color: 'danger', message: 'Could not add link to bowl.'}));
        console.error(err);
        return;
    }

    dispatch(spinnerSetStatus(false));
  }

  const handleLink = () => {
    
    try {
      const link = new URL(url);
      addToBowl(link);
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
      <IonButton className='Link__Submit-Button' color={'primary'} fill="outline" onClick={() => {
        handleLink();
      }}>Submit</IonButton>
    </div>
  )
}

export default Link