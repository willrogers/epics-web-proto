import {
    UPDATE_PV,
    CREATE_CONNECTION,
    SUBSCRIBE_TO_PV
} from '../client/actions/EPICSActions.js';

import {ServerConnection} from '../client/connection/ServerConnection.js'

const initialState = {
    epicsData: {},
    connectionObject: null 
};

//Default params initialises state when nothing is passed
function EPICSReducer(state = initialState, action) {
    switch(action.type) {

        case SUBSCRIBE_TO_PV:
        if(state.connectionObject !== null){
            var connection = state.connectionObject
            connection.createSubscription(action.payload.component);
        }

        case UPDATE_PV:
        var newEpicsData = Object.assign({}, state.epicsData);
        newEpicsData[action.payload.pvName] = action.payload.pvValue;
        return Object.assign({}, state,{
            epicsData: newEpicsData
        });
        break;

        case CREATE_CONNECTION:
        if(state.connectionObject === null) {
            return Object.assign({}, state, {
                connectionObject: new ServerConnection()
            });
        }
        break;

        default:
        return state;
    }
}

export default EPICSReducer;
