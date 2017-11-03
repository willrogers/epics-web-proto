import {
    RECEIVE_PV_UPDATE,
    CREATE_SUBSCRIPTION
} from '../client/actions/EPICSActions.js';

const initialState = {
    epicsData: {},
    connectionObject: null
};

//Default params initialises state when nothing is passed
function EPICSWebReducer(state = initialState, action) {
    switch(action.type) {

    case RECEIVE_PV_UPDATE:
        /* Set state according to what's in the action */
        state.epicsData[action.payload.pvName] = action.payload.pvValue;
        return state;
    default:
        return state;

    case CREATE_SUBSCRIPTION:
        if(state.connectionObject === null) {
            state.connectionObject = action.payload;
    }

    }
}

export default EPICSWebReducer;
