import './File.scss';
import React, { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid';
import { useDispatch } from 'react-redux';
import { spinnerSetStatus } from '../store/sliceSpinner';
import { IonProgressBar } from '@ionic/react';
import FileCard from '../components/FileCard';

const File = () => {

  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const dispatch = useDispatch();

  const deleteFile = id => {
    const curFiles = [...files];
    const remainingFiles = curFiles.filter(file => file.id !== id);
    setFiles(remainingFiles);
  }

  
    const onDrop = useCallback( async acceptedFiles => {
        dispatch(spinnerSetStatus(true))
        
        for (let i = 0; i < acceptedFiles.length; ++i) {
          let file = acceptedFiles[i];
          file.id = uuidv4();
          console.log('accepted files', acceptedFiles);
        };

        setFiles(acceptedFiles);

        dispatch(spinnerSetStatus(false))
    })
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    
  return (
    <div className='File'>
        <div className='File__Dropbox' style={{width: '90%', display: 'block', margin: "0 auto", height: '96px', padding: '.5rem', border: '1px solid var(--ion-color-primary)', cursor: 'pointer'}}>
          <div {...getRootProps()}>
              <input {...getInputProps()} />
              {
                  <p style={{height:'6rem', width:'100%'}}>&nbsp;Drag 'n' drop some files here, or click to select files</p>
              }
          </div>
          {files.length > 0 && <div className='File__Cards'>
            {files.map(file => <FileCard key={file.id} file={file} deleteFile={deleteFile}/>)}
            </div>
          }

          
        </div>
    </div>
  )
}

export default File