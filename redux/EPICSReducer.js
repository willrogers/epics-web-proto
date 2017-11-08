import {
    UPDATE_PV,
    CREATE_CONNECTION
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
        // Set state according to what's in the action
        var newEpicsData = Object.assign({}, state.epicsData);
        newEpicsData[action.payload.pvName] = action.payload.pvValue;
        return Object.assign({}, state,{
            epicsData: newEpicsData
        });

    case CREATE_CONNECTION:
        if(state.connectionObject === null) {
            //return Object.assign({}, state, {
            new ServerConnection(action.payload.component);
            //});
            // Here, we are throwing the connection object away.
            // The component that listens to the return from malcolm is the reason that
            // it persists.
            //
            // TODO: figure out how to keep the WS and reuse it.
            //
            return state;
        }
        break;

    default:
        return state;
    }
}

export default EPICSWebReducer;
