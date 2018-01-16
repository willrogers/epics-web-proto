import {store} from '../../redux/EPICSStore.js';

//Action types
export const UPDATE_PV = 'UPDATE_PV';
export const CREATE_CONNECTION = 'CREATE_CONNECTION';
export const SUBSCRIBE_TO_PV = 'SUBSCRIBE_TO_PV';
export const UNSUBSCRIBE_TO_PV = 'UNSUBSCRIBE_TO_PV';


//Action creators: These package a change-in-state into
//an object to be sent around our redux loop to the reducer

export function updatePV(newValue, pvName) {
    return store.dispatch({
        type: UPDATE_PV,
        payload:{
            pvName: pvName,
            pvValue: newValue
        }
    });
}

export function connectToServer(URL) {
    return store.dispatch({
        type: CREATE_CONNECTION,
        payload:{
            webSocketURL: URL
        }
    });
}

export function subscribeToPV(comp) {
    return store.dispatch({
        type: SUBSCRIBE_TO_PV,
        payload:{
            id: comp.id,
            block: comp.props.block,
            property: comp.props.property
        }
    });
}

export function unsubscribeToPV(id) {
    return store.dispatch({
        type: UNSUBSCRIBE_TO_PV,
        payload: {
            unsubID: id
        }
    });

}

export function updateWebSockStatus(readyState) {
    return store.dispatch({
        type: UPDATE_WS_READYSTATE,
        payload: {
            wsStatus: readyState
        }
    });
}


