import './Text.scss';
import { IonButton, IonItem, IonTextarea } from '@ionic/react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { spinnerSetStatus } from '../store/sliceSpinner';
import { toastSet } from '../store/sliceToast';
import * as socketService from '../socketService';
import axios from 'axios';

function Text() {
  const [text, setText] = useState('');
  const fill = useSelector(state => state.fill);
  const login = useSelector(state => state.login);
  
  const dispatch = useDispatch();
  
  const addText = async () => {
    dispatch(spinnerSetStatus(true));
    console.log(login.accountId, fill.currentBowl, text);

    const request = {
      url: `https://assets.aimixer.io:5002/TextToUrl`,
      method: 'post',
      data: {
        text,
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

      const { title, date, link, type, subtype, length, id } = response.data;
      socketService.emit('addContentToBowl', {token: login.token, bowlId: fill.currentBowl, content: {title, date, link, type, subtype, id, length}});
      setText('');

    } catch(err) {
        dispatch(spinnerSetStatus(false));
        dispatch(toastSet({color: 'danger', message: 'Could not add link to bowl.'}));
        console.error(err);
        return;
    }

    dispatch(spinnerSetStatus(false));
  }

  return (
    <div className='TextInput'>
      <IonItem>
          <IonTextarea className='TextInput__Textarea' placeholder="Add Information" value={text} onIonChange={(e) => setText(e.target.value)}></IonTextarea>
      </IonItem>
      <IonButton className='TextInput__Button' fill='outline' onClick={addText}>Submit</IonButton>

    </div>
  )
}

export default Text