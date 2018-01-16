import {
    UPDATE_PV,
    CREATE_CONNECTION,
    SUBSCRIBE_TO_PV,
    UNSUBSCRIBE_TO_PV,
    UPDATE_WS_READYSTATE
} from '../client/actions/EPICSActions.js';

import {ServerInterface} from '../client/connection/ServerInterface.js';

//Initial state of our store
const initialState = {
    epicsData: {},
    connectionObject: null,
    wsReadyState: null
};

//Default params initialises state when nothing is passed
function EPICSReducer(state = initialState, action) {

    // The reducer takes our current state and an action, and returns
    // a new state that reflects the changes we want to make, described
    // in the action. Object.assign creates a blank object and copies
    // properties over, allowing us to avoid mutating the state.
    switch(action.type) {

    case SUBSCRIBE_TO_PV: {
        if (state.connectionObject !== null) {
            state.connectionObject.monitorPV(
                action.payload.id,
                action.payload.block,
                action.payload.property);
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
                connectionObject: new ServerInterface(action.payload.webSocketURL)
            });
        }
        return state;
    }

    case UPDATE_WS_READYSTATE: {
        return Object.assign({}, state, {
            wsReadyState: action.payload.wsStatus
        });
    }

    //If nothing matches, return the default state.
    default: {
        return state;
    }

    }
}

export default EPICSReducer;
