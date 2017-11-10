import {store} from '../../redux/EPICSStore.js';

//Action types
export const UPDATE_PV = 'UPDATE_PV';
export const CREATE_CONNECTION = 'CREATE_CONNECTION';
export const SUBSCRIBE_TO_PV = 'SUBSCRIBE_TO_PV';
export const UNSUBSCRIBE_TO_PV = 'UNSUBSCRIBE_TO_PV';

//Action creators
export function updatePV(newValue, pvName) {
    const updateAction = store.dispatch({
        type: UPDATE_PV,
        payload: {pvName: pvName, pvValue: newValue}
    });
    return updateAction;
}

export function connectToServer(websocket_url) {
    const connectAction = store.dispatch({
        type: CREATE_CONNECTION,
        payload: {url: websocket_url}
    });
    return connectAction;
}

export function subscribeToPV(comp) {
    const subscribeAction = store.dispatch({
        type: SUBSCRIBE_TO_PV,
        payload: {component: comp}
    });
    return subscribeAction;
}

export function unsubscribeToPV(id) {
    const unsubscribeAction = store.dispatch({
        type: UNSUBSCRIBE_TO_PV,
        payload: {unsubID: id}
    });
    return unsubscribeAction;
}