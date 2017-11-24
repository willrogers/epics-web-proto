import {store} from '../../redux/EPICSStore.js';

//Action types
export const UPDATE_PV = 'UPDATE_PV';
export const CREATE_CONNECTION = 'CREATE_CONNECTION';
export const SUBSCRIBE_TO_PV = 'SUBSCRIBE_TO_PV';
export const UNSUBSCRIBE_TO_PV = 'UNSUBSCRIBE_TO_PV';

//Action creators, these package a change in state into
//an object to be sent around our redux loop to the reducer
export function updatePV(newValue, pvName) {
    return store.dispatch({
        type: UPDATE_PV,
        payload: {
            pvName: pvName,
            pvValue: newValue
        }
    });
}

//No payload: Connection details are handled by plugin
export function connectToServer() {
    return store.dispatch({
        type: CREATE_CONNECTION,
    });
}

export function subscribeToPV(comp) {

    const compId = comp.id;
    const block = comp.props.block;
    const property = comp.props.property

    return store.dispatch({
        type: SUBSCRIBE_TO_PV,
        payload: {
            id: compId,
            block: block,
            property: property
        }
    });
}

export function unsubscribeToPV(id) {
    return store.dispatch({
        type: UNSUBSCRIBE_TO_PV,
        payload: {unsubID: id}
    });
}

