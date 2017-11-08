import {store} from '../../redux/EPICSStore.js';

//Action types
export const UPDATE_PV = 'UPDATE_PV';
export const CREATE_CONNECTION = 'CREATE_CONNECTION';
export const SUBSCRIBE_TO_PV = 'SUBSCRIBE_TO_PV';

//Action creators
export function updatePV(newValue, pvName) {
    const updateAction = store.dispatch({
        type: UPDATE_PV,
        payload: {pvName: pvName, pvValue: newValue}
    });
    return updateAction;
}

export function connectToServer(comp) {
    const connectAction = store.dispatch({
        type: CREATE_CONNECTION,
        payload: {component: comp}
    });
    return connectAction;
}

//TODO currently connection and subscription are handled as one.
//We need to split this apart with this currently unused function:
export function subscribe(desiredPVName) {
    const subscribeAction = store.dispatch({
        type: SUBSCRIBE_TO_PV,
        payload: {pvName: desiredPVName}
    });
    return subscribeAction;
}