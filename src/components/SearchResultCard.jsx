import './SearchResultCard.scss';
import { IonButton } from '@ionic/react'
import React from 'react'


function SearchResultCard({result}) {
  return (
    <div className="SearchResultCard">
        <a className="SearchResultCard__Title" href={result.link} target="_blank">
            <h2 >{result.title}</h2>
        </a>
        <div className="SearchResultCard__Date">{result.date}</div>
        <IonButton className="SearchResultCard__Select-Button">Select</IonButton>
    </div>
  )
}

export default SearchResultCard