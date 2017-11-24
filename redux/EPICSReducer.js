import {
    UPDATE_PV,
    CREATE_CONNECTION,
    SUBSCRIBE_TO_PV,
    UNSUBSCRIBE_TO_PV
} from '../client/actions/EPICSActions.js';

import {ServerInterface} from '../client/connection/ServerInterface.js';

const initialState = {
    epicsData: {},
    connectionObject: new ServerInterface() // Can I make it here?
};

//Default params initialises state when nothing is passed
function EPICSReducer(state = initialState, action) {
    switch(action.type) {

    case SUBSCRIBE_TO_PV: {
        if (state.connectionObject !== null) {
            state.connectionObject.monitorPV(action.payload.component);
        }
        return state;
    }

    case UNSUBSCRIBE_TO_PV: {
        if (state.connectionObject !== null) {
            state.connectionObject.destroyMonitor(action.payload.unsubID);
        }
        return state;
    }

    case UPDATE_PV: {
        const newEpicsData = Object.assign({}, state.epicsData);

        newEpicsData[action.payload.pvName] = action.payload.pvValue;

        return Object.assign({}, state, {
            epicsData: newEpicsData
        });
    }

    case CREATE_CONNECTION: {
        if (state.connectionObject === null) {
            return Object.assign({}, state, {
                connectionObject: new ServerInterface()
            });
        }
        return state;
    }

    default: {
        return state;
    }

    }
}

export default EPICSReducer;
