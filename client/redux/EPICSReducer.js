//Import the actionType constants
import {
    UPDATE_PV,
    UPDATE_WS_READYSTATE,
} from '../actions/EPICSActions.js';

//Initial state of our store, empty
const initialState = {
    epicsData: {},
    wsReadyState: null
};

//Default params initialises state when nothing is passed
function EPICSReducer(state = initialState, action) {

    // The reducer takes our current state and an action, and returns
    // a new state that reflects the changes we want to make, described
    // in the action. Object.assign creates a blank object and copies
    // properties over, allowing us to avoid mutating the state.
    switch(action.type) {

    //Update the state of the PVs that we are listening to.
    //Create a copy of the current epicsData. Then target the
    //desired PV (pvName) in the old data and update it (pvValue).
    //Apply this to our state.
    case UPDATE_PV: {
        const newEpicsData = Object.assign({}, state.epicsData);
        newEpicsData[action.payload.pvName] = action.payload.pvValue;
        return Object.assign({}, state, {
            epicsData: newEpicsData
        });
    }

    //Update the state of the websocket status. Make a copy of the
    //state that reflects the wsStatus, and use it to replace the
    //old state.
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
