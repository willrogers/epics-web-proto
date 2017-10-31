import {
    RECEIVE_PV_UPDATE
} from '../client/actions/EPICSActions.js';

const initialState = {
    epicsData: {}
};

//Default params initialises state when nothing is passed
function EPICSWebReducer(state = initialState, action){
    console.log('reducer: the action type is ' + action.type);
    switch(action.type){

        case RECEIVE_PV_UPDATE:
            /* Set state according to what's in the action */
            state.epicsData[action.payload.pvName] = action.payload.pvValue;
            return state;
        default:
            return state;
    }
}

export default EPICSWebReducer;
