import {
    RECEIVE_PV_UPDATE
} from '../client/actions/EPICSActions.js';

const initialState = {
    pvName: null,
    pvValue: null
};

//Default params initialises state when nothing is passed
function EPICSWebReducer(state = initialState, action){
    switch(action.type){

        case RECEIVE_PV_UPDATE:

            Object.assign({}, state, {
                pvName: action.payload.pvName,
                pvValue: action.payload.pvValue
            })

        default:
            return state
    }
}

export default EPICSWebReducer;