import {
    UPDATE_PV,
    CREATE_CONNECTION
} from '../client/actions/EPICSActions.js';

import {ServerConnection} from '../client/connection/ServerConnection.js'

const initialState = {
    epicsData: {},
    connectionObject: null //There can only be one
};

//Default params initialises state when nothing is passed
function EPICSWebReducer(state = initialState, action) {
    switch(action.type) {

    case UPDATE_PV:
        /* Set state according to what's in the action */
        state.epicsData[action.payload.pvName] = action.payload.pvValue;
        return state;
    default:
        return state;

    case CREATE_CONNECTION:
        if(state.connectionObject === null) {
            state.connectionObject = new ServerConnection();
        }

    }
}

export default EPICSWebReducer;
