
import {
    CREATE_CONNECTION,
    SUBSCRIBE_TO_PV,
    UNSUBSCRIBE_TO_PV,
    CLOSE_WEBSOCKET
} from '../client/actions/EPICSActions.js';

import {ServerInterface} from '../client/connection/ServerInterface.js';

let connectionObject = null;

const websockMiddleware = next => action => {

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
        }
        break;

        default: {
            next(action)
        }
    }
};

export default websockMiddleware
