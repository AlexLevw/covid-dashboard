import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Popup } from "react-leaflet";


const CustomMarker = ( ) => {
    const nameCantry = "Беларусь"
    const ill = 23
    const recover = 22
    const died = 1

    return (
      <Popup>
        {nameCantry} <br />
        Заболевшие: {ill}<br />
        Выздоровевшие: {recover}<br />
        Умершие: {died}
        <button>Листать</button>
      </Popup>
    )
}


export default CustomMarker;
