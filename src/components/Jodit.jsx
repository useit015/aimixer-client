import './Jodit.scss'
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loginSetMode } from '../store/sliceLogin';
import { IonButton } from '@ionic/react';
import axios from 'axios';

import JoditEditor from 'jodit-react';

function Jodit() {
  const editor = useRef(null);
	const [content, setContent] = useState('');

  const config = 
		{
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
			placeholder: 'Loading...'
		};

  const config2 = {
    zIndex: 0,
    readonly: false,
    activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about', 'dots'],
    toolbarButtonSize: 'middle',
    theme: 'default',
    saveModeInCookie: false,
    spellcheck: true,
    editorCssClass: false,
    triggerChangeEvent: true,
    width: 'auto',
    height: 'auto',
    minHeight: 100,
    direction: '',
    // language: 'auto',
    // debugLanguage: false,
    // i18n: 'en',
    // tabIndex: -1,
    toolbar: true,
    // enter: "P",
    // defaultMode: Jodit.MODE_WYSIWYG,
    // useSplitMode: false,
    // colors: {
    //     greyscale:  ['#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF'],
    //     palette:    ['#980000', '#FF0000', '#FF9900', '#FFFF00', '#00F0F0', '#00FFFF', '#4A86E8', '#0000FF', '#9900FF', '#FF00FF'],
    //     full: [
    //         '#E6B8AF', '#F4CCCC', '#FCE5CD', '#FFF2CC', '#D9EAD3', '#D0E0E3', '#C9DAF8', '#CFE2F3', '#D9D2E9', '#EAD1DC',
    //         '#DD7E6B', '#EA9999', '#F9CB9C', '#FFE599', '#B6D7A8', '#A2C4C9', '#A4C2F4', '#9FC5E8', '#B4A7D6', '#D5A6BD',
    //         '#CC4125', '#E06666', '#F6B26B', '#FFD966', '#93C47D', '#76A5AF', '#6D9EEB', '#6FA8DC', '#8E7CC3', '#C27BA0',
    //         '#A61C00', '#CC0000', '#E69138', '#F1C232', '#6AA84F', '#45818E', '#3C78D8', '#3D85C6', '#674EA7', '#A64D79',
    //         '#85200C', '#990000', '#B45F06', '#BF9000', '#38761D', '#134F5C', '#1155CC', '#0B5394', '#351C75', '#733554',
    //         '#5B0F00', '#660000', '#783F04', '#7F6000', '#274E13', '#0C343D', '#1C4587', '#073763', '#20124D', '#4C1130'
    //     ]
    // },
    // colorPickerDefaultTab: 'background',
    // imageDefaultWidth: 300,
    // removeButtons: [],
    // disablePlugins: [],
    // extraButtons: [],
    // sizeLG: 900,
    // sizeMD: 700,
    // sizeSM: 400,
    // sizeSM: 400,
    buttons: [
        'source', '|',
        'bold',
        'strikethrough',
        'underline',
        'italic', '|',
        'ul',
        'ol', '|',
        'outdent', 'indent',  '|',
        'font',
        'fontsize',
        'brush',
        'paragraph', '|',
        'image',
        'video',
        'table',
        'link', '|',
        'align', 'undo', 'redo', '|',
        'hr',
        'eraser',
        'copyformat', '|',
        'symbol',
        'print',
        'about'
    ],
    // buttonsXS: [
    //     'bold',
    //     'image', '|',
    //     'brush',
    //     'paragraph', '|',
    //     'align', '|',
    //     'undo', 'redo', '|',
    //     'eraser',
    //     'dots'
    // ]
}

  const login = useSelector(state => state.login);
  const fill = useSelector(state => state.fill);
  const bowls = useSelector(state => state.bowls);
  const mix = useSelector(state => state.mix);
  
  const dispatch = useDispatch();

  const curBowl = bowls.find(b => b.id == fill.currentBowl);

  const setTheContent = (data) => {
    const paragraphs = data.split("\n");
    for (let i = 0; i < paragraphs.length; ++i) {
      if (paragraphs[i].endsWith('>')) continue;
      paragraphs[i] = paragraphs[i]+'<br>';
    }

    data = paragraphs.join("\n");

    setContent(data);
  }

  const fetchContent = async () => {
    try {
      const response = await axios.get(curBowl.creations[0]);
      setTheContent(response.data);
    } catch (err) {
      console.error(err);
      
    }
  }

  useEffect(() => {
    if (!content) fetchContent();
  })

  return (
    <div className='Jodit'>
        <IonButton className='Jodit__Button-Back' color={'primary'} onClick={() => dispatch(loginSetMode('mix'))}>Back</IonButton>
        <JoditEditor
          
          ref={editor}
          value={content}
          config={config2}
          tabIndex={1} // tabIndex of textarea
          onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={newContent => {}}
        />
      
    </div>
  )
}

export default Jodit