import './DesktopApp.scss';
import React from 'react'
import { useSelector } from 'react-redux';
import Login from './components/Login';


const DesktopApp = () => {
  const login = useSelector(state => state.login);

  return (
    <div className='Desktop'>
      {!login.isLoggedIn && <Login /> }
    </div>
  )
}

export default DesktopApp