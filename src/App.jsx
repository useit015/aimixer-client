import React, { useState } from 'react';
import MobileApp from './MobileApp'
import DesktopApp from './DesktopApp';
import { useSelector } from 'react-redux';
import Login from './components/Login';

function App() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const login = useSelector(state => state.login);

    console.log('login',login);


    // get list of available servers




    const handleResize = () => {
       setScreenWidth(window.innerWidth)
    }

    if (!window.screenWidthSet) {
        window.screenWidthSet = true;
        window.addEventListener('resize', handleResize)
    }

    if (!login.isLoggedIn) return <Login />

    if (screenWidth <= 786) return <MobileApp /> 
    else return <DesktopApp />
}

export default App