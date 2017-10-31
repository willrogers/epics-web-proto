import ServerConnection from '../connection/ServerConnection.js'
import {store} from '../../redux/EPICSStore.js'

//Action types
export const RECEIVE_PV_UPDATE = 'RECEIVE_PV_UPDATE';
export const SUBSCRIBE_TO_PV = 'SUBSCRIBE_TO_PV';

//Action creators
export function receivePVUpdate(newValue){

        const update = store.dispatch({
            type: RECEIVE_PV_UPDATE,
            payload: { pvName: 'pv', pvValue: newValue }
        });

        return update
}

export function subscribeToPV(desiredPV, componentID){

    var server = new ServerConnection()
    server.subscribePV()
    /*
    return
        dispatch({
            type: SUBSCRIBE_TO_PV,
            payload: {
                PV: desiredPV,
                ID: componentID
            }
        });
    */
}

