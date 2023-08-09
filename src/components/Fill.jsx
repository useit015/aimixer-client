import { IonButton, IonItem, IonSelect, IonSelectOption } from '@ionic/react';
import './Fill.scss'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginSetMode } from '../store/sliceLogin';
import { fillChangeCurOutput } from '../store/sliceFill';

function Fill() {

    const fill = useSelector(state => state.fill);
    const bowls = useSelector(state => state.bowls);
    
    const dispatch = useDispatch();

    const curBowl = bowls.find(b => b.id == fill.currentBowl);
    const curOutput = fill.outputs.find(o => o.id === fill.curOutput);
    const curLength = fill.lengths.find(o => o.id === fill.curLength);

    console.log('FillPage', fill, curBowl);
  return (
    <div className='Fill'>
      <IonButton className='Fill__Button-Change-Bowl' color={'primary'} onClick={() => dispatch(loginSetMode('bowls'))}>Change Bowl</IonButton>
      <h1 className="Fill__Title">{curBowl.name}</h1>
      <IonItem>
        <IonSelect label="Create" placeholder={curOutput.name} value={curOutput.id} onIonChange={(e) => {
          console.log(e.detail.value);
          dispatch(fillChangeCurOutput(e.detail.value))
        }}>
          {fill.outputs.map(o => {
            return <IonSelectOption key={o.id} value={o.id}>{o.name}</IonSelectOption>
          })}
    
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonSelect label="Length" placeholder={curLength.name} value={curLength.id} onIonChange={(e) => {
          console.log(e.detail.value);
          dispatch(fillChangeCurLength(e.detail.value))
        }}>
          {fill.lengths.map(o => {
            return <IonSelectOption key={o.id} value={o.id}>{o.name}</IonSelectOption>
          })}
    
        </IonSelect>
      </IonItem>
    </div>
  )
}

export default Fill