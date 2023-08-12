import { IonButton, IonItem, IonSelect, IonSelectOption, IonTextarea } from '@ionic/react';
import './Fill.scss'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginSetMode } from '../store/sliceLogin';
import { fillChangeCurLength, fillChangeCurOutput, fillChangeCurSource } from '../store/sliceFill';
import * as socketService from '../socketService';
import GoogleSearch from '../inputs/GoogleSearch';
import SiteSearch from '../inputs/SiteSearch';
import File from '../inputs/File';
import Link from '../inputs/Link';
import AIMixerAsset from '../inputs/AIMixerAsset';
import Text from '../inputs/Text';
import { bowlsSetCustomInstructions } from '../store/sliceBowls';
import { RiBlenderLine } from 'react-icons/ri';
import { PiArticle } from 'react-icons/pi';

function Fill() {

    const login = useSelector(state => state.login);
    const fill = useSelector(state => state.fill);
    const bowls = useSelector(state => state.bowls);
    
    const dispatch = useDispatch();

    const curBowl = bowls.find(b => b.id == fill.currentBowl);
    const curOutput = fill.outputs.find(o => o.id === curBowl.output);
    const curLength = fill.lengths.find(o => o.id === curBowl.length);
    const curSource = fill.sources.find(o => o.id === curBowl.source);

    console.log('FillPage', fill, curBowl);
  return (
    <div className='Fill'>
      <IonButton className='Fill__Button-Change-Bowl' color={'primary'} onClick={() => dispatch(loginSetMode('mix'))}>Blender</IonButton>
      <h1 className="Fill__Title">{curBowl.name}</h1>
      <IonItem>
        <IonSelect label="Create" placeholder={curOutput.name} value={curOutput.id} onIonChange={(e) => {
          console.log(e.detail.value);
          socketService.emit('changeBowlOutput', {id: curBowl.id, output: e.detail.value, token: login.token})
        }}>
          {fill.outputs.map(o => {
            return <IonSelectOption key={o.id} value={o.id}>{o.name}</IonSelectOption>
          })}
    
        </IonSelect>
        
      </IonItem>
      {curBowl.output === 'custom' && <IonItem>
          <IonTextarea rows={4} label="Custom" placeholder="AI instructions" value={curBowl.customInstructions} onIonChange={(e) => dispatch(bowlsSetCustomInstructions({bowlId: curBowl.id, customInstructions: e.target.value}))}></IonTextarea>
       </IonItem>
      }
      {curBowl.output !== 'custom' &&  <IonItem>
        <IonSelect label="Length" placeholder={curLength.name} value={curLength.id} onIonChange={(e) => {
          console.log(e.detail.value);
          socketService.emit('changeBowlLength', {id: curBowl.id, length: e.detail.value, token: login.token})
        }}>
          {fill.lengths.map(o => {
            return <IonSelectOption key={o.id} value={o.id}>{o.name}</IonSelectOption>
          })}
    
        </IonSelect>
       </IonItem>
      }
      <IonItem>
        <IonSelect label="Source" placeholder={curSource.name} value={curSource.id} onIonChange={(e) => {
          console.log(e.detail.value);
          socketService.emit('changeBowlSource', {id: curBowl.id, source: e.detail.value, token: login.token})
        }}>
          {fill.sources.map(o => {
            return (<IonSelectOption key={o.id} value={o.id}>{o.name}</IonSelectOption>)
          })}
    
        </IonSelect>
      </IonItem>

      <div className="Fill__Input">
        {curBowl.source === 'googleSearch' && <SiteSearch />}
        
        {curBowl.source === 'link' && <Link />}
        {curBowl.source === 'text' && <Text />}
        {curBowl.source === 'file' && <File />}
        
      </div>
      {curBowl.contents.length > 0 && <div className='Fill__Num-Contents' onClick={() => {dispatch(loginSetMode('mix'))}}><RiBlenderLine color="white"/></div> }
      {curBowl.creations.length > 0 && <div className='Fill__Num-Creations' onClick={() => {dispatch(loginSetMode('jodit'))}}><PiArticle color="white" /></div> }
    </div>
  )
}

export default Fill