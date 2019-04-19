//Gives us the dispatch functionality
import {store} from '../redux/EPICSStore.js';

//Action types
export const UPDATE_PV = 'UPDATE_PV';
export const WRITE_PV = 'WRITE_PV';
export const CREATE_CONNECTION = 'CREATE_CONNECTION';
export const SUBSCRIBE_TO_PV = 'SUBSCRIBE_TO_PV';
export const UNSUBSCRIBE_TO_PV = 'UNSUBSCRIBE_TO_PV';
export const UPDATE_WS_READYSTATE = 'UPDATE_WS_READYSTATE';
export const CLOSE_WEBSOCKET = 'CLOSE_WEBSOCKET';

//Action creators: These package a change in state into
//an object called an action.Then, this action is sent to
//our middleware/reducer/store chain. THe type is a constant
//used to identify the action in the middleware/reducer, the
//payload is the data that we wish to send.


//This actions contains the name of a PV for which we wish
//to update the state, along with the value that we need
// to apply to it.
export function updatePV(pvName, newValue) {
    return store.dispatch({
        type: UPDATE_PV,
        payload:{
            pvName: pvName,
            pvValue: newValue
        }
    });
}

//This action expresses our desire to make a connection to
//a server via a websocket. The action contains the URL for
//the desired port.
export function connectToServer(URL, pluginType) {
    return store.dispatch({
        type: CREATE_CONNECTION,
        payload:{
            websocketURL: URL,
            connectionPlugin: pluginType
        }
    });
}

//This actions signifies our wish to subscribe to a certain
//PV. We supply it with a React component, it
//then extracts the block and property from the components
// props, which we explicitly specify in main,js at
// instantiation. Then, the id is extracted from the
// component object.
export function subscribeToPV(comp) {
    return store.dispatch({
        type: SUBSCRIBE_TO_PV,
        payload:{
            id: comp.id,
            pv: comp.props.pv
        }
    });
}

//This action allows us to send a request to stop serving us a PV,
//based on the ID that we keep associated with the component that
//is listening
//to it.
export function unsubscribeToPV(id) {
    return store.dispatch({
        type: UNSUBSCRIBE_TO_PV,
        payload: {
            unsubID: id
        }
    });

}

//This Action contains the readyState of the websocket
//connection, which we use to monitor the status of the
//websocket.
export function updateWebSockStatus(readyState) {
    return store.dispatch({
        type: UPDATE_WS_READYSTATE,
        payload: {
            wsStatus: readyState
        }
    });
}


//This action contains no payload, it simply expresses
//our wish to close the websocket connection.
export function closeWebsocket() {
    return store.dispatch({
        type: CLOSE_WEBSOCKET
    });
}



