//Malcolm stuffs
//Holds a websocket connection
//Will get called on component instantiation to make a subscription
//onMessage: create an action to dispatch to the store

//Dummy Server to begin with:
import {store} from '../../redux/EPICSStore.js';

import {
    RECEIVE_PV_UPDATE,
    receivePVUpdate
} from '../actions/EPICSActions.js';

export default class ServerConnection {

    constructor() {
    }

    subscribePV() {
        store.dispatch({
            type: RECEIVE_PV_UPDATE,
            payload: {
                pvName: 'Signal',
                pvValue: 1234567
            }
        });
    }

}