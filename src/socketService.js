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
   });

   socket.on('deleteBowl', id => {
        console.log('deleteBowl event', id);
        store.dispatch({
            type: 'bowls/bowlsDeleteBowl',
            payload: id
        })
    });

    socket.on('changeBowlName', ({id, name}) => {
        store.dispatch({
            type: 'bowls/bowlsChangeBowlName',
            payload: {
                id, name
            }
        })
    });

    socket.on('changeBowlOutput', ({id, output}) => {
        store.dispatch({
            type: 'bowls/bowlsChangeBowlOutput',
            payload: {
                id, output
            }
        })
    });

    socket.on('changeBowlLength', ({id, length}) => {
        store.dispatch({
            type: 'bowls/bowlsChangeBowlLength',
            payload: {
                id, length
            }
        })
    });

    socket.on('changeBowlSource', ({id, source}) => {
        store.dispatch({
            type: 'bowls/bowlsChangeBowlSource',
            payload: {
                id, source
            }
        })
    });

    socket.on('addContentToBowl', ({bowlId, content}) => {
        store.dispatch({
            type: 'bowls/bowlsAddContent',
            payload: {
                id: bowlId, content
            }
        })
    });

    socket.on('changeContentDate', ({bowlId, contentId, date}) => {
        store.dispatch({
            type: 'bowls/bowlsChangeContentDate',
            payload: {
                bowlId, contentId, date
            }
        })
    });

    socket.on('addCreation', ({bowlId, creation}) => {
        store.dispatch({
            type: 'bowls/bowlsAddCreation',
            payload: {
                bowlId, creation
            }
        })
    });

    socket.on('deleteContent', ({bowlId, contentId}) => {
        store.dispatch({
            type: 'bowls/bowlsDeleteContent',
            payload: {
                bowlId, contentId
            }
        })
    });

    socket.on('spinnerStatus', (status) => {
        store.dispatch({
            type: 'spinner/spinnerSetStatus',
            payload: status
        })
    });


}

export const emit = (event, ...args) => {
    console.log('socket emit', event, ...args);
    socket.emit(event, ...args);
}