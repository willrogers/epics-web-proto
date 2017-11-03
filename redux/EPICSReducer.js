import {
    UPDATE_PV,
    CREATE_CONNECTION,
    SUBSCRIBE_TO_PV
} from '../client/actions/EPICSActions.js';

import {ServerConnection} from '../client/connection/ServerConnection.js';

const initialState = {
    epicsData: {},
    connectionObject: null //There can only be one
};

//Default params initialises state when nothing is passed
function EPICSWebReducer(state = initialState, action) {
    switch(action.type) {

    case UPDATE_PV:
        /* Set state according to what's in the action */
        // state.epicsData[action.payload.pvName] = action.payload.pvValue;
        // return state;

        var newEpicsData = Object.assign({}, state.epicsData);
        newEpicsData[action.payload.pvName] = action.payload.pvValue;

        return Object.assign({}, state,{
            epicsData: newEpicsData
        });

    
    case CREATE_CONNECTION:
        if(state.connectionObject === null) {
            return Object.assign({}, state, {
                connectionObject: new ServerConnection()
            });
        }

    case SUBSCRIBE_TO_PV:
        connection = store.connectionObject();
        connection.createSubscription(action.payload.pvName);

    default:
        return state;
    }
}

export default EPICSWebReducer;
