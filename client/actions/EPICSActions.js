import {store} from '../../redux/EPICSStore.js';
import {ServerConnection} from '../connection/ServerConnection.js'

//Action types
export const UPDATE_PV = 'UPDATE_PV';
export const CREATE_SUBSCRIPTION = 'CREATE_SUBSCRIPTION';


//Action creators
export function updatePV(newValue) {
    const update = store.dispatch({
        type: UPDATE_PV,
        payload: { pvName: 'pv', pvValue: newValue }
    });
    return update;
}


export function createSubscription() {
    const update = store.dispatch({
        type: CREATE_SUBSCRIPTION,
        payload: new ServerConnection()
    });

}
