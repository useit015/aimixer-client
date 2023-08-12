import { useDispatch, useSelector } from 'react-redux';
import './Mix.scss';
import React from 'react'
import { loginSetMode } from '../store/sliceLogin';
import { IonButton, IonItem, IonTextarea } from '@ionic/react';
import { mixSetTopics } from '../store/sliceMix';
import ContentsCard from './ContentsCard';
import { spinnerSetStatus } from '../store/sliceSpinner';
import axios from 'axios'
import { bowlsSetInfo } from '../store/sliceBowls';
import * as socketService from '../socketService';
import { TbBowl } from 'react-icons/tb';
import { PiArticle } from 'react-icons/pi';

function Mix() {
    const login = useSelector(state => state.login);
    const fill = useSelector(state => state.fill);
    const bowls = useSelector(state => state.bowls);
    const mix = useSelector(state => state.mix);
    
    const dispatch = useDispatch();

    const curBowl = bowls.find(b => b.id == fill.currentBowl);
    const curOutput = fill.outputs.find(o => o.id === curBowl.output);
    const curLength = fill.lengths.find(o => o.id === curBowl.length);
    const curSource = fill.sources.find(o => o.id === curBowl.source);

    const handleApply = () => {

    }

    const handleSetTopics = async e => {
        console.log('handleSetTopics');

        dispatch(mixSetTopics(e.target.value))
        dispatch(spinnerSetStatus(true));

        const promises = [];

        for (let i = 0; i < curBowl.contents.length; ++i) {
            promises.push(axios({
                url: `https://assets.aimixer.io:5002/filterTopics`,
                method: 'post',
                data: {
                    topics: e.target.value,
                    link: curBowl.contents[i].link,
                    token: login.token,
                    bowlId: curBowl.id
                }
            }))
        }

        try {
            const results = await Promise.all(promises);
            console.log(results);
            const info = results.map(r => {
                const {infoLink, infoLength} = r.data;
                return {
                    infoLink, infoLength
                }
            })
            dispatch(bowlsSetInfo({bowlId: curBowl.id, info}))
        } catch (err) {
            console.error(err)
        }

        dispatch(spinnerSetStatus(false));
    }

    let mixLength = 0;
    for (let i = 0; i < curBowl.contents.length; ++i) mixLength += typeof curBowl.contents[i].infoLength !== 'undefined' ? curBowl.contents[i].infoLength : curBowl.contents[i].length;

  return (
    <div className='Mix'>
        <IonButton className='Mix__Button-Mix' color={'primary'} onClick={() => socketService.emit('mix', {login, bowls, mix, bowlId: curBowl.id})}>Mix</IonButton>
        <h1 className="Mix__Title" onClick={() => dispatch(loginSetMode('bowls'))}>{curBowl.name}</h1>
        <h2 className="Mix__Length">{mixLength} Words</h2>
        <IonItem>
            <IonTextarea rows={4} label="Topics" placeholder="All" value={mix.topics} onIonChange={handleSetTopics}></IonTextarea>
        </IonItem>
        <IonButton className='Mix__Button-Apply' color={'primary'} onClick={handleApply}>Set Topics</IonButton>
        <h2 className="Mix__Subtitle">Bowl Contents</h2>
        <div className="Mix__Contents-Container">
            {curBowl.contents.map(c => {
                return <ContentsCard key={c.id} content={c}/>
            })}
        </div>

        <div className='Mix__Num-Contents' onClick={() => {dispatch(loginSetMode('fill'))}}><TbBowl color="white" /></div>
        {curBowl.creations.length > 0 && <div className='Mix__Num-Creations' onClick={() => {dispatch(loginSetMode('jodit'))}}><PiArticle color="white" /></div> }
    </div>
  )
}

export default Mix