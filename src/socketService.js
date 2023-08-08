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

   socket.on('alert', msg => {
    store.dispatch({
        type: 'toast/toastSet',
        payload: {
            position: 'middle',
            message: msg,
            color: 'danger'
        }
    })
   })

   socket.on('message', msg => {
    store.dispatch({
        type: 'toast/toastSet',
        payload: {
            position: 'middle',
            message: msg,
            color: 'primary'
        }
    })
   })

   socket.on('addBowl', bowl => {
    store.dispatch({
        type: 'bowls/bowlsAddBowl',
        payload: bowl
    })
   })

   socket.on('setBowls', bowls => {
        store.dispatch({
            type: 'bowls/bowlsSetBowls',
            payload: bowls
        })
   }) 

   
}

export const emit = (event, ...args) => socket.emit(event, ...args);