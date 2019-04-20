//Define the action type constants
import {
    CREATE_CONNECTION,
    SUBSCRIBE_TO_PV,
    WRITE_PV,
    UNSUBSCRIBE_TO_PV,
    CLOSE_WEBSOCKET
} from '../actions/epics-actions';

//Import the websocket functionality
import {ServerInterface} from '../connection/server-interface';

//Instantiate the connectionObject
let connectionObject = null;

//Initialise the middleware. This gives us the funciontality
// of the store dispatch (currently unutilised) and the ability
//to pass an action to 'next' which is the next step in our
//chain of middleware/reducers.

const websocketMiddleware = _store => next => action => {

    //Check the type of the action
    switch (action.type) {

    //If no connObj exists, create it using the URL provided in the
    //action.
    case CREATE_CONNECTION: {
        if (connectionObject === null) {
            connectionObject = new ServerInterface(
                action.payload.webSocketURL,
                action.payload.connectionPlugin
            );
        }
        break;
    }

    //Provided there is a connObj, call the monitorPV method of the
    //connObj and create a subscription to listen to a PV
    case SUBSCRIBE_TO_PV: {
        if (connectionObject !== null) {
            connectionObject.monitorPV(
                action.payload.id,
                action.payload.pv);
        }
        break;
    }

    case WRITE_PV: {
        connectionObject.putPV(action.payload.pv, action.payload.newValue);
        break;
    }

    //Provided there is a connObj, destroy the subscription identified
    // by the supplied ID
    case UNSUBSCRIBE_TO_PV: {
        if (connectionObject !== null) {
            connectionObject.destroyMonitor(action.payload.unsubID);
        }
        break;
    }

    //To close the websocket we first need to kill all of the
    //subscriptions.
    case CLOSE_WEBSOCKET: {
        if (connectionObject !== null) {
            connectionObject.destroyAllMonitors();
            connectionObject.closeWebsocket();
        }
    }
        break;

        //If the action type doesn't match any of these cases, forward it
        //to the next link the chain - currently this is our reducer.
    default: {
        next(action);
    }
    }
};

export default websocketMiddleware;
