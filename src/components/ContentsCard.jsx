import './ContentsCard.scss';
import { IonButton, IonDatetime } from '@ionic/react'
import React, { useState } from 'react'
import * as socketService from '../socketService';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from "luxon";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit } from 'react-icons/fi';
import { basicEditorSet } from '../store/sliceBasicEditor';
import { loginSetMode } from '../store/sliceLogin';

function ContentsCard({content}) {
    console.log('c', content)
    const [showPicker, setShowPicker] = useState(false);

    const login = useSelector(state => state.login);
    const fill = useSelector(state => state.fill);
    const bowls = useSelector(state => state.bowls);

    const dispatch = useDispatch();

    const curBowl = bowls.find(b => b.id == fill.currentBowl);
    const curOutput = fill.outputs.find(o => o.id === curBowl.output);
    const curLength = fill.lengths.find(o => o.id === curBowl.length);
    const curSource = fill.sources.find(o => o.id === curBowl.source);

    const theDate = DateTime.fromISO(content.date).toFormat('MMMM dd, yyyy');

    console.log('theDate', theDate);

    const handleDateChange = e => {
        socketService.emit('changeContentDate', {token: login.token, contentId: content.id, bowlId: curBowl.id, date: e.target.value});
    }

    const handleDelete = e => {
        socketService.emit('deleteContent', {token: login.token, contentId: content.id, bowlId: curBowl.id});
    }

    const handleEdit = () => {
      dispatch(basicEditorSet({bowlId: curBowl.id, contentId: content.id, contentLink: content.link}));
      dispatch(loginSetMode('basicEditor'));
    }


  return (
    <div className='ContentsCard'>
        <div className="ContentsCard__Num-Words">{typeof content.infoLength !== 'undefined' ? content.infoLength : content.length} Words</div>
        <h2 className="ContentsCard__Title">{content.title}</h2>
        <div className='ContentsCard__Action-Container'>
          <FiEdit className='ContentsCard__Edit-Button' color='var(--ion-color-primary)' size="1.85rem" 
            onClick={() => {
              handleEdit();
            }} />

            <IonButton className='ContentsCard__Button-Date' fill="outline" onClick={() => {
              const curVal = showPicker;
              setShowPicker(!curVal)
              }}>{theDate}</IonButton>
            
       
            
            <MdOutlineDeleteOutline className='ContentsCard__Delete-Button' color="var(--ion-color-danger)" size="2rem" onClick={handleDelete}/>
        </div>
        {showPicker && <IonDatetime className='ContentsCard__Date-Picker' value={content.date} presentation='date' onIonChange={handleDateChange}></IonDatetime>}
    </div>
  )
}

export default ContentsCard