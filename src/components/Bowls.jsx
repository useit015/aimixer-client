import React from 'react'
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { store } from '../store/configStore';
import * as socketService from '../socketService';

function Bowls() {
    const login = useSelector(state => state.login);

    console.log('login', login);

    socketService.setupTheSocket(io, `https://api.aimixer.io:5000`, store);

    return (
    <div>Bowls</div>
  )
}

export default Bowls