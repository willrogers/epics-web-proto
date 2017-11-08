import {store} from '../../redux/EPICSStore.js';

//Action types
export const UPDATE_PV = 'UPDATE_PV';
export const CREATE_CONNECTION = 'CREATE_CONNECTION';
export const SUBSCRIBE_TO_PV = 'SUBSCRIBE_TO_PV';

//Action creators
export function updatePV(newValue) {
    const updateAction = store.dispatch({
        type: UPDATE_PV,
        payload: { pvName: 'pv', pvValue: newValue }
    });
    return updateAction;
}


export function connectToServer(comp) {

    console.log("comp in EpicsActions - connectToServer: ")
    console.log(comp)

    const connectAction = store.dispatch({
        type: CREATE_CONNECTION,
        payload: {component: comp}
    });
    
    console.log("connectAction output from connectToServer");
    console.log(connectAction);
    return connectAction;
}


export function subscribe(desiredPVName) {
    const subscribeAction = store.dispatch({
        type: SUBSCRIBE_TO_PV,
        payload: {pvName: desiredPVName}
    });
    return subscribeAction;
}