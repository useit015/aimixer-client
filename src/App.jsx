//https://ionicframework.com/docs/components

import React, { useState } from 'react';
import MobileApp from './MobileApp'
import DesktopApp from './DesktopApp';

function App() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

   
    // get list of available servers

    const handleResize = () => {
       setScreenWidth(window.innerWidth)
    }

    if (!window.screenWidthSet) {
        window.screenWidthSet = true;
        window.addEventListener('resize', handleResize)
    }

    if (screenWidth <= 786) return <MobileApp /> 
    else return <DesktopApp />
}

export default App