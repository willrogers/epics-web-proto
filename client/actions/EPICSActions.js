import {store} from '../../redux/EPICSStore.js';

//Action types
export const UPDATE_PV = 'UPDATE_PV';
export const CREATE_SUBSCRIPTION = 'CREATE_SUBSCRIPTION';


//Action creators
export function updatePV(newValue) {
    const updateAction = store.dispatch({
        type: UPDATE_PV,
        payload: { pvName: 'pv', pvValue: newValue }
    });
    return updateAction;
}


export function createConnection() {
    const connectAction = store.dispatch({
        type: CREATE_CONNECTION
    });
    return connectAction;
}
