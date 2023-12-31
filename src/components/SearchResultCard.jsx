import './SearchResultCard.scss';
import { IonButton } from '@ionic/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as socketService from '../socketService';
import { toastSet } from '../store/sliceToast';
import { spinnerSetStatus } from '../store/sliceSpinner';
import axios from 'axios';

function SearchResultCard({result}) {

  const fill = useSelector(state => state.fill);
  const login = useSelector(state => state.login);
  const servers = useSelector(state => state.servers);

  const dispatch = useDispatch();

  const addToBowl = async () => {
    dispatch(spinnerSetStatus(true));
    console.log(login.accountId, fill.currentBowl, result.link);

    const request = {
      url: `${servers.assets[servers.mode]}/urlToText`,
      method: 'post',
      data: {
        url: result.link,
        token: login.token,
        accountId: login.accountId,
        bowlId: fill.currentBowl,
        options: {
          markdown: true
        }
      }
    };

    try {
      const response = await axios(request);
      if (response.data.status !== 'success') {
        dispatch(spinnerSetStatus(false));
        dispatch(toastSet({color: 'danger', message: response.data.msg}));
        return;
      }

      const { title, date, link, type, subtype, length } = response.data;
      socketService.emit('addContentToBowl', {token: login.token, bowlId: fill.currentBowl, content: {title, date, link, type, subtype, id: result.id, length, origURL: result.link}});

    } catch(err) {
        dispatch(spinnerSetStatus(false));
        dispatch(toastSet({color: 'danger', message: 'Could not add link to bowl.'}));
        console.error(err);
        return;
    }

    dispatch(spinnerSetStatus(false));
  }

  return (
    <div className="SearchResultCard" >
       <div style={{width: "96%", display: "flex", flexDirection: 'column', margin: 'auto'}}>
            <a className="SearchResultCard__Title" href={result.link} target="_blank">
                <h2 style={{fontSize: '1.2rem'}}>{result.title}</h2>
            </a>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div className="SearchResultCard__Domain">{result.domain}</div>
                <div className="SearchResultCard__Date">{result.date}</div>
            </div>
            <IonButton className="SearchResultCard__Select-Button" onClick={addToBowl} fill='outline'>Add</IonButton>
       </div>
        
    </div>
  )
}

export default SearchResultCard