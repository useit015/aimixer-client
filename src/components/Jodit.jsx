/*
 * Jodit Examples: https://codesandbox.io/examples/package/jodit-react
 */

import './Jodit.scss'
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loginSetMode } from '../store/sliceLogin';
import { IonButton, IonInput, IonItem, IonSelect, IonSelectOption } from '@ionic/react';
import axios from 'axios';
import { FiEdit } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import JoditEditor from 'jodit-react';
import { TbBowl } from 'react-icons/tb';
import { RiBlenderLine } from 'react-icons/ri';
import * as socketService from '../socketService';
import { toastSet } from '../store/sliceToast';
import { spinnerSetStatus } from '../store/sliceSpinner';

function Jodit() {
  const login = useSelector(state => state.login);
  const fill = useSelector(state => state.fill);
  const bowls = useSelector(state => state.bowls);
  const mix = useSelector(state => state.mix);
  
  const dispatch = useDispatch();

  const curBowl = bowls.find(b => b.id == fill.currentBowl);

  const editor = useRef(null);
	const [content, setContent] = useState('');
  const [output, setOutput] = useState('post');
  const [outputs, setOutputs] = useState([]);
  const [creation, setCreation] = useState('creation-0');
  const [title, setTitle] = useState(`${curBowl.name}--${uuidv4()}`);
  const [selectVersion, setSelectVersion] = useState(false);

  const excludedOutputs = [
    'attachment',
    'nav_menu_item',
    'wp_block',
    'wp_template',
    'wp_template_part',
    'wp_navigation'
  ]

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
        'about',
        {
          name: "copyContent",
          tooltip: "Copy HTML to Clipboard",
          iconURL: "../assets/images/delete.svg",
          // exec: function(editor) {
          //   let html = editor.value;
          //   html = html.replaceAll('Bankman', 'Bankwoman');
          //   setContent(html);
          //   console.log(html);
          // }
          popup: (editor, current, self, close) => {
            console.log(editor);
            const selection = editor.selection.current();
            console.log(selection)
            let divElement = editor.create.div("merge-field-popup");
            divElement.innerText = "Hello There"
            return divElement;
          }
        }
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



  console.log('Jodit curBowl', curBowl)

  const setTheContent = (data) => {
    const paragraphs = data.split("\n");
    for (let i = 0; i < paragraphs.length; ++i) {
      if (paragraphs[i].endsWith('>')) continue;
      paragraphs[i] = paragraphs[i]+'<br>';
    }

    data = paragraphs.join("\n");

    setContent(data);
  }

  const fetchContent = async (index) => {
    try {
      const response = await axios.get(curBowl.creations[index]);
      setTheContent(response.data);
      setCreation(`creation-${index}`);
    } catch (err) {
      console.error(err);
    }
  }

  const config3 = useMemo(
    () => (config2),
    []
);

const fetchOutputs = async () => {
  if (outputs.length > 1) return;

  const request = {
    url: `https://delta.pymnts.com/wp-json/wp/v2/types`,
    method: 'get'
  }

  try {
    const response = await axios(request);
    const postTypes = Object.keys(response.data);
    console.log('postTypes', postTypes);
    const selections = postTypes.filter(t => !excludedOutputs.find(eo => eo === t));
    setOutputs(selections);

  } catch (err) {
    console.error(err);
    setOutputs(['post'])
  }
}

  const handleUpload = () => {
    socketService.emit('wordpressUpload', {
      username: login.username,
      password: login.password,
      token: login.token,
      title,
      postType: output,
      content
    })
    dispatch(spinnerSetStatus(true))
  }

  useEffect(() => {
    if (!content) fetchContent(0);
    if (login.domain === '@pymnts.com') fetchOutputs();
    
  })

  return (
    <div className='Jodit'>
        <IonButton className='Jodit__Button-Back' color={'primary'} onClick={handleUpload}>Upload</IonButton>
        <h1 className="Jodit__Title" onClick={() => dispatch(loginSetMode('bowls'))}>{curBowl.name}</h1>
        <h3 className='Jodit__Version'
          onClick={() => {
            const curSetting = selectVersion;
            setSelectVersion(!curSetting);
          }}
        >
          {`Version ${Number(creation.split('-')[1])+1}`}
        </h3>
        {selectVersion &&  <IonItem>
            <IonSelect label="Version" placeholder={'post'} value={creation} onIonChange={(e) => {
              const choice = e.target.value;
              const parts = choice.split('-');
              const indexStr = parts[1];
              const index = Number(indexStr)
              fetchContent(index);
              setSelectVersion(false);
            }}>
              {curBowl.creations.map((o, i) => {
                return <IonSelectOption key={`creation-${i}`} value={`creation-${i}`}>{`${i+1}`}</IonSelectOption>
              })}
        
            </IonSelect>
         </IonItem>
        }
        <IonItem className='Jodit__Creation-Name'>
              <IonInput label="Title" labelPlacement="floating" placeholder="Enter name" value={title} onInput={(e) => {
                setTitle(e.target.value)
                }}/>
        </IonItem>
        {login.domain === '@pymnts.com' && <IonItem>
            <IonSelect label="Type" placeholder={'post'} value={output} onIonChange={(e) => {
              setOutput(e.target.value)
            }}>
              {outputs.map(o => {
                return <IonSelectOption key={o} value={o}>{o}</IonSelectOption>
              })}
        
            </IonSelect>
         </IonItem>
        }
       
        <JoditEditor
          
          ref={editor}
          value={content}
          config={config3}
          tabIndex={1} // tabIndex of textarea
          onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={newContent => {console.log('hello')}}
          
        />
        <div className='Jodit__Num-Contents' onClick={() => {dispatch(loginSetMode('fill'))}}><TbBowl color="white" /></div>
        {curBowl.contents.length > 0 && <div className='Jodit__Num-Creations' onClick={() => {dispatch(loginSetMode('mix'))}}><RiBlenderLine color="white"/></div> }
        
    </div>
  )
}

export default Jodit