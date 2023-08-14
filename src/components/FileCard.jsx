import { IonButton, IonCheckbox, IonDatetime, IonProgressBar } from "@ionic/react";
import "./FileCard.scss";
import React, { useState } from 'react';
import { DateTime } from "luxon";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit } from 'react-icons/fi';
import { useDispatch, useSelector } from "react-redux";
import * as socketService from '../socketService';
import { spinnerSetStatus } from "../store/sliceSpinner";
import { toastSet } from "../store/sliceToast";
import axios from "axios";

function FileCard({file, deleteFile}) {
    const [showPicker, setShowPicker] = useState(false);
    const [ISODate, setISODate] = useState(DateTime.fromMillis(file.lastModified).toISODate());
    const [mode, setMode] = useState('display');
    const [speakerTranscript, setSpeakerTranscript] = useState(true);

    let loc = file.name.lastIndexOf('.');
    const extension = loc !== -1 ? file.name.substring(loc) : '.bin';
    let initName = loc !== -1 ? file.name.substr(0, loc).replaceAll(/[-\_]/g, ' ') : file.name.replaceAll(/[-\_]/g, ' ');
    const [name, setName] = useState(initName);
    const [progress, setProgress] = useState(0);

    const dispatch = useDispatch();

    const login = useSelector(state => state.login);
    const fill = useSelector(state => state.fill);
    const bowls = useSelector(state => state.bowls);
    
    const curBowl = bowls.find(b => b.id == fill.currentBowl);

    const videoTypes = [
      '.mp4',
      '.mkv',
      '.mov',
      '.wmv',
      '.avi',
    ]

    const audioTypes = [
      '.mp3',
      '.m4a',
      '.flac',
      '.wav'
    ]

    let isVideo = videoTypes.find(v => v === extension) ? true : false;
    let isAudio = audioTypes.find(a => a === extension) ? true : false;

    console.log('lastModified', file.lastModified);

    const uploadToS3 = async (
      uploadUrl,
      file,
      fields = {},
      onProgressChange = () => {},
    ) => {
      console.log('uploadToS3', uploadUrl, file);
  
      const formData = new FormData();
    
      Object.keys(fields).forEach((key) => {
        formData.append(key, fields[key]);
      });
      formData.append("Content-Type", file.type);
    
      //  Make sure to pass data first otherwise it'll throw an error like
      // Bucket POST must contain a field named 'key'.  If it is specified, please check the order of the fields.
      formData.append("file", file, file?.name);
    
      const parseProgress = (progressEvent) => {
        const progressPercentage =
          Math.ceil((progressEvent.loaded / progressEvent.total) * 100);
        dispatch(toastSet({color: 'success', message: `Uploading file to AI Mixer Cloud: ${progressPercentage}%`}));
        //console.log('progressPercentage', progressPercentage);
        //setProgress(progressPercentage);
        //onProgressChange(progressPercentage);
      };
    
      try {
        const res = await axios.put(uploadUrl, file, {
          onUploadProgress: parseProgress,
          headers: {
            'x-amz-acl': 'public-read',
            'Content-Type': file.type
          }
        });
    
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    };
  

    const handleAddFile = async () => {
      setProgress(0);
      dispatch(spinnerSetStatus(true));
      
      /*
       * Add file to bowl in database and get presigned URL
       */
      let request = {
        url: `https://assets.aimixer.io:5002/uploadFile`,
        method: 'post',
        data: {
          token: login.token,
          bowlId: curBowl.id,
          title: name,
          name: file.name,
          type: file.type,
          size: file.size,
          date: ISODate
        }
      }

      try {
        let response = await axios(request);
        let url = response.data;

        /*
         * Upload the file to the user's assets folder
         */
        
        await uploadToS3(url, file);
        /*
         * Convert the file to text
         */

        let loc = url.indexOf('?');
        if (loc !== -1) url = url.substr(0, loc);

        request = {
            url: `https://assets.aimixer.io:5002/urlToText`,
            method: 'post',
            data: {
              url,
              token: login.token,
              bowlId: curBowl.id,
              options: {
                speakerTranscript
              }
            }
        }

        response = await axios(request);

        const { title, date, link, type, subtype, length, id } = response.data;
        socketService.emit('addContentToBowl', {token: login.token, bowlId: fill.currentBowl, content: {title, date, link, type, subtype, id, length}});
    
      } catch(err) {
        console.error('error', err);
        dispatch(spinnerSetStatus(false));
        dispatch(toastSet({color: 'danger', message: 'Could not upload file'}))
      }

      dispatch(spinnerSetStatus(false));
    }
 

  return (
    <div className="FileCard">
        {mode === 'display' && <h2 className="FileCard__Name" onClick={() => setMode('edit')}>{name}</h2>}
        {mode === 'edit' && <textarea rows={4} className="FileCard__Input-Name" type='text' value={name} onChange={(e) => setName(e.target.value)} onBlur={() => setMode('display')}/>}
        <IonButton className='FileCard__Button-Date' onClick={() => {
              const curVal = showPicker;
              setShowPicker(!curVal)
              }}>{DateTime.fromISO(ISODate).toFormat('MMMM dd, yyyy')}
        </IonButton>
        {showPicker && <IonDatetime className='FileCard__Date-Picker' value={ISODate} presentation='date' onIonChange={(e) => setISODate(e.target.value)}></IonDatetime>}
        <div>
          <IonButton className='BowlCard__FillButton' onClick={handleAddFile}>
              {'Add'}
          </IonButton>
          {(isVideo || isAudio) && <IonCheckbox className='FileCard__Speaker-Checkbox' labelPlacement="end" checked={speakerTranscript} onIonChange={(e) => {
            let curVal = speakerTranscript;
            setSpeakerTranscript(!curVal);
          }}>Create Speaker Transcript</IonCheckbox>
          }
          <div className="FileCard__Action-Container">
            <FiEdit color='var(--ion-color-primary)' size="1.85rem" 
            onClick={() => {
              const newMode = mode === 'display' ? 'edit' : 'display';
              setMode(newMode); 
            }} />
            <MdOutlineDeleteOutline color="var(--ion-color-danger)" size="2rem" onClick={() => deleteFile(file.id)}/>
          </div>
        </div>
    </div>
        
  )
}

export default FileCard