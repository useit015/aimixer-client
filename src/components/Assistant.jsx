import { IonButton, IonTextarea } from '@ionic/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as socketService from '../socketService';
import { assistantClose, assistantSetPrompt } from '../store/sliceAssistant';
import './Assistant.scss';

const Assistant = ({ article }) => {
  const dispatch = useDispatch();

  const {
    login,
    isOpen,
    currentBowl,
    prompt: userPrompt
  } = useSelector(state => ({
    currentBowl: state.bowls.find(bowl => bowl.id == state.fill.currentBowl),
    login: state.login,
    ...state.assistant
  }));

  const handler = () => {
    if (!userPrompt || !currentBowl || !article || !login) {
      return;
    }

    socketService.emit('aiAssistant', {
      bowlId: currentBowl.id,
      userPrompt,
      article,
      login
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className='Assistant' onClick={() => dispatch(assistantClose())}>
      <div className='Assistant__modal' onClick={e => e.stopPropagation()}>
        <div className='Assistant__modal-title'>
          <h2>Modify this document using AI</h2>
        </div>

        <IonTextarea
          rows={6}
          autoFocus
          fill='outline'
          value={userPrompt}
          className='Assistant__modal-text'
          placeholder='write a shorter version'
          onInput={e => dispatch(assistantSetPrompt(e.target.value))}
        />

        <div className='Assistant__modal-action'>
          <IonButton className='Action-Button' onClick={handler}>
            Generate
          </IonButton>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
