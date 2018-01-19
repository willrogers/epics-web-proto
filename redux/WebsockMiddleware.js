//Import the connection-y stuff
//We will keep the websocket in here, If we pick out a websocket-y
//action then we will handle the logic in here, and pass the return
//back to action creator, to send to the store. If we don't recognise
//the actionType here (in this case, we will be looking at the return from
// an action that has previously gone through this middleware.)
// Then we will pass it on to the standard reducer fr

import {
    CREATE_CONNECTION,
    SUBSCRIBE_TO_PV,
    UNSUBSCRIBE_TO_PV,
    UPDATE_WS_READYSTATE,
    CLOSE_WEBSOCKET
} from '../client/actions/EPICSActions.js';

import {ServerInterface} from '../client/connection/ServerInterface.js';

let connectionObject = null

const websockMiddleware = store => next => action => {

    switch (action.type) {

        case CREATE_CONNECTION: {
            if (connectionObject === null) {
                connectionObject = new ServerInterface(action.payload.webSocketURL)
            }
            break;
        }

        case SUBSCRIBE_TO_PV: {
            if (connectionObject !== null) {
                connectionObject.monitorPV(
                    action.payload.id,
                    action.payload.block,
                    action.payload.property);
            }
            break;
        }

        case UNSUBSCRIBE_TO_PV: {
            if (connectionObject !== null) {
                connectionObject.destroyMonitor(action.payload.unsubID);
            }
            break;
        }

        case CLOSE_WEBSOCKET: {
            connectionObject.destroyAllMonitors();
            connectionObject.closeWebsocket();
            return state;
        }

        default: {
            next(action)
        }
    }
};

export default websockMiddleware

//
// if (action.type === CLOSE_WEBSOCKET) {
//     console.log("Reached the middleware")
//     store.dispatch()
// }
