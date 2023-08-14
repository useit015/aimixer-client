import './BasicTextEditor.scss';
import { IonButton, IonInput, IonItem, IonTextarea } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { basicEditorSetContent, basicEditorSetReplaceTerm, basicEditorSetSearchTerm } from '../store/sliceBasicEditor';
import axios from 'axios';
import { toastSet } from '../store/sliceToast';
import { loginSetMode } from '../store/sliceLogin';
import { spinnerSetStatus } from '../store/sliceSpinner';

function BasicTextEditor() {
  const [count, setCount] = useState();
  const textAreaElement = useRef();

  const basicEditor = useSelector(state => state.basicEditor);
  const login = useSelector(state => state.login)
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

  const handleSelection = e => {
    const element = textAreaElement.current;
    console.log('element', element)
    let startPos = element.selectionStart;
    let endPos = element.selectionEnd;
    let selectedText = element.value.substring(startPos, endPos);

    if(selectedText.length <= 0) {
      return; // stop here if selection length is <= 0
    }
    
    // log the selection
    console.log("startPos: " + startPos, " | endPos: " + endPos );
    console.log("selectedText: " +  selectedText);
    dispatch(basicEditorSetSearchTerm(selectedText));
  }

  const handleSave = async () => {
    dispatch(spinnerSetStatus(true));
    let request = {
      url: `https://assets.aimixer.io:5002/updateLink`,
      method: 'post',
      data: {
        link: basicEditor.contentLink,
        content: basicEditor.content,
        token: login.token
      }
    }

    try {
      const response = await axios(request);
    } catch (err) {
      console.error(err);
      dispatch(toastSet({color: 'danger', message: 'Error saving content.'}));
      
    }
    dispatch(spinnerSetStatus(false));
    dispatch(loginSetMode('mix'));
  }
  
  useEffect(() => {
    if (basicEditor.status) loadContent()
    searchCount();
  })

  return (
    <div className='BasicTextEditor'>
      <IonButton className='BasicTextEditor__Button-Done' color={'primary'} onClick={() => {dispatch(handleSave)}}>Save</IonButton>
      <h1 className="BasicTextEditor__Title">Edit</h1>
      <IonItem>
          <IonInput className='BasicEditor__SeachTerm' placeholder="Search" value={basicEditor.searchTerm} onIonChange={(e) => dispatch(basicEditorSetSearchTerm(e.target.value))} />
          <div className='BasicTextEditor__SearchCount'>{count}</div>
        </IonItem>
        <IonItem>
          <IonInput className='BasicTextEditor__ReplaceTerm' placeholder="Replace" value={basicEditor.replaceTerm} onIonChange={(e) => dispatch(basicEditorSetReplaceTerm(e.target.value))} />
        </IonItem>
        <IonButton className='BasicTextEditor__Replace-Button' color={"primary"}
          onClick={(e) => {
            const re = new RegExp(basicEditor.searchTerm, "gi");
            const content = basicEditor.content.replaceAll(re, basicEditor.replaceTerm);
            dispatch(basicEditorSetContent(content));
          }}
        >
          Replace
        </IonButton>
      <textarea className='BasicTextEditor__Edit' value={basicEditor.content} 
        ref={textAreaElement}
        onChange={(e) => dispatch(basicEditorSetContent(e.target.value))}
        onMouseUp={handleSelection}
        onKeyUp={handleSelection}
        onTouchEnd={handleSelection}
        />
    </div>
  )
}

export default BasicTextEditor