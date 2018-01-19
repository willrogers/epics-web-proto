import {
    UPDATE_PV,
    UPDATE_WS_READYSTATE,
} from '../client/actions/EPICSActions.js';

//Initial state of our store
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

    case UPDATE_PV: {
        const newEpicsData = Object.assign({}, state.epicsData);
        newEpicsData[action.payload.pvName] = action.payload.pvValue;
        return Object.assign({}, state, {
            epicsData: newEpicsData
        });
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
