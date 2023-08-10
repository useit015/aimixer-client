import './BasicTextEditor.scss';
import { IonButton, IonInput, IonItem, IonTextarea } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { basicEditorSetContent } from '../store/sliceBasicEditor';
import axios from 'axios';
import { toastSet } from '../store/sliceToast';
import { loginSetMode } from '../store/sliceLogin';

function BasicTextEditor() {
  const [count, setCount] = useState();

  const basicEditor = useSelector(state => state.basicEditor);
  const dispatch = useDispatch();

  console.log('basicEditor', basicEditor)
    
  const loadContent = async () => {
    const request = {
      url: basicEditor.contentLink,
      method: 'get'
    }
    try {
      const response = await axios(request);
      dispatch(dispatch(basicEditorSetContent(response.data)));
    } catch(err) {
      console.error(err);
      dispatch(loginSetMode('mix'));

    }
  }

  const searchCount = () => {
    console.log('searchCount')
    if (!basicEditor.searchTerm) return 0;
    let loc = basicEditor.content.indexOf(basicEditor.searchTerm);
    if (loc === -1) return setCount(0);
    let count = 1;
    while (loc !== -1) {
      loc = basicEditor.content.indexOf(basicEditor.searchTerm, loc+1);
      if (loc !== -1) ++count;
    }

    return setCount(count);
  }
  
  useEffect(() => {
    if (basicEditor.status) loadContent()
    searchCount();
  })

  return (
    <div className='BasicTextEditor'>
      <IonButton className='BasicTextEditor__Button-Done' color={'primary'} onClick={() => {dispatch(loginSetMode('mix'))}}>Save</IonButton>
      <h1 className="BasicTextEditor__Title">Edit</h1>
      <IonItem>
          <IonInput className='BasicEditor__SeachTerm' placeholder="Search term" value={basicEditor.searchTerm} onIonChange={(e) => dispatch(basicEditorSetSearchTerm(e.target.value))} />
          <div className='BasicEditor__SearchCount'>{count}</div>
        </IonItem>
      <IonTextarea className='BasicTextEditor__Edit' value={basicEditor.content} onIonChange={(e) => dispatch(basicEditorSetContent(e.target.value))}/>
    </div>
  )
}

export default BasicTextEditor