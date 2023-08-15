import './GoogleSearch.scss';
import { IonButton, IonInput, IonItem, IonRadio, IonRadioGroup } from '@ionic/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toastSet } from '../store/sliceToast';
import axios from 'axios';
import SearchResultCard from '../components/SearchResultCard';
import { spinnerSetStatus } from '../store/sliceSpinner';


function SiteSearch() {
  const [term, setTerm] = useState('');
  const [site, setSite] = useState('');
  const [timePeriod, setTimePeriod] = useState('last_month');
  const [index, setIndex] = useState('google_search_news'); 
  const [results, setResults] = useState([]);
  

  const dispatch = useDispatch();
  const login = useSelector(state => state.login);
  const spinner = useSelector(state => state.spinner);

  const timePeriods = [
    {id: 'last_hour', name: 'Hour'},
    {id: 'last_day', name: 'Day'},
    {id: 'last_week', name: 'Week'},
    {id: 'last_month', name: 'Month'},
    {id: 'last_year', name: 'Year'} 
  ]

  const indexes = [
    {id: 'google_search_news', name: "News"},
    {id: 'google_search_web', name: 'Web'},
    {id: 'google_search_video', name: 'Video'}
  ]

  const handleSearch = async () => {
    const request = {
        url: `https://assets.aimixer.io:5002/query`,
        method: 'post',
        data: {
            type: index,
            query: site ? term + ` site:${site}` : term,
            timePeriod: timePeriod,
            token: login.token
        }
    }

    let response; 
    setResults([]);
    dispatch(spinnerSetStatus(true));

    try {
      response = await axios(request);
      setResults(response.data);  
      if (!response.data.length) dispatch(toastSet({color: 'danger', message: `No results found on ${site}`}));
    } catch(err) {
      console.error(err);
      dispatch(spinnerSetStatus(false));
      return dispatch(toastSet({color: 'danger', message: 'Error retrieving Google results.'}));
    }
    dispatch(spinnerSetStatus(false));
  }

  return (
    <div className="GoogleSearch">
      <div className="GoogleSearch__Site">
        <IonItem>
          <IonInput placeholder="Optional site domain name (e.g. www.cnbc.com)" value={site} onIonChange={(e) => setSite(e.target.value)} />
        </IonItem>
      </div>
      <div className="GoogleSearch__Search-Term">
        <IonItem>
          <IonInput placeholder="Search term" value={term} onIonChange={(e) => setTerm(e.target.value)} />
        </IonItem>
      </div>
      <div className="GoogleSearch__Time-Period">
        <IonRadioGroup value={timePeriod} onIonChange={(e) => setTimePeriod(e.target.value)}>
        <div style={{display: 'flex', justifyContent:'center', marginTop: '1rem'}}>
          {timePeriods.map(tp => {
            return (
              <div key={tp.id} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                <IonRadio className="GoogleSearch__Radio"  value={tp.id} aria-label="Custom checkbox" labelPlacement='end'></IonRadio>
                <div className='GoogleSearch__Radio-Labels'>{tp.name}</div>
              </div>
              )
            
          })}  
        </div>
        </IonRadioGroup>
      </div>
      <div className="GoogleSearch__Indexes">
        <IonRadioGroup value={index} onIonChange={(e) => setIndex(e.target.value)}>
        <div style={{display: 'flex', justifyContent:'center', margin: '1rem .5rem 0 .5rem'}}>
          {indexes.map(tp => {
            return (
              <div key={tp.id} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                <IonRadio className="GoogleSearch__Radio"  value={tp.id} aria-label="Custom checkbox" labelPlacement='end'></IonRadio>
                <div style={{display: 'inline-block', marginLeft: '-1.25rem', marginRight: '1.5rem', verticalAlign: 'middle'}}>{tp.name}</div>
              </div>
              )
          })}  
        </div>
        </IonRadioGroup>
      </div>
      <IonButton className='GoogleSearch__Submit-Button' color={'primary'} onClick={() => {
        if (!term) return dispatch(toastSet({color: 'danger', message: "Missing search term."}));
        if (term.length < 2) return dispatch(toastSet({color: 'danger', message: "Invalid search term."}));
        
        
        handleSearch();
      }}>Submit</IonButton>
      <div className="GoogleSearch__Results">
        {results.map(r => <SearchResultCard key={r.id} result={r} />)}
      </div>
    </div>
  )
}

export default SiteSearch