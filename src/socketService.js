let socket = null;

export const setupTheSocket = (socketio, url, store) => {
    if (socket) return;
    socket = socketio(url);
    
   socket.on('echo', msg => {
    store.dispatch({
        type: 'msg/setMsg',
        payload: msg.msg
    })
   })

   socket.on('test', msg => {
    console.log('test',msg);
    // store.dispatch(toast.toastSet({position: 'middle', message: msg, color: 'danger'}));
    store.dispatch({
        type: 'toast/toastSet',
        payload: msg
    })
   })
}

export const emit = (event, ...args) => socket.emit(event, ...args);