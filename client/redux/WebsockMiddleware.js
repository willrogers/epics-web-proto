//Define the action type constants
import {
    CREATE_CONNECTION,
    SUBSCRIBE_TO_PV,
    UNSUBSCRIBE_TO_PV,
    UNSUBSCRIBE_ALL
} from '../actions/EPICSActions.js';

//Import the websocket functionality
import {ServerInterface} from '../connection/ServerInterface.js';

//Instantiate the connectionObject
let connectionObject = null;

//Tracks which component ID's are subscribed to which PVs.
let pvToComponentMap = {};

//A unique Identifier for a PV to use with malcolm subscriptions
let malcolmSubID = 0;
//A map of which PV is associated with which which Malcolm ID
let pvToMalcolmIDMap = {};

//Initialise the middleware. This gives us the funciontality
// of the store dispatch (currently unutilised) and the ability
//to pass an action to 'next' which is the next step in our
//chain of middleware/reducers.

const websockMiddleware = _store => next => action => {

    switch (action.type) {

    case CREATE_CONNECTION: {
        if (connectionObject === null) {
            connectionObject = new ServerInterface(action.payload.webSocketURL);
        }
        break;
    }

    case SUBSCRIBE_TO_PV: {
        //If subscriptionMap does not contain the subscription, create it.
        if (!(Object.keys(pvToComponentMap).includes(action.payload.property))) {
            if (connectionObject !== null) {
                connectionObject.monitorPV(
                    malcolmSubID,
                    action.payload.block,
                    action.payload.property);
            }
            //Set PV - componentID pair
            pvToComponentMap[action.payload.property] = [action.payload.id];
            // Set the PV - malcID pair (for unsubbing)
            pvToMalcolmIDMap[action.payload.property] = malcolmSubID;
            malcolmSubID++;

        } else {
            //...add new ID to existing IDs associated with that PV
            pvToComponentMap[action.payload.property].push(action.payload.id);
        }
        break;
    }

    case UNSUBSCRIBE_TO_PV: {

        //Split out from action for readability
        const pvName = action.payload.pvName;
        const compId = action.payload.unsubID;

        //If the pvName that we are unsubbing from is in the map..
        if (Object.keys(pvToComponentMap).includes(pvName)) {
            //Loop through each of the pvNames
            for (let i in pvToComponentMap[pvName]) {
                //If the component ID matches with one of the elements in the value array
                if (compId === pvToComponentMap[pvName][i]) {
                    //Remove the element from pv-comp map.
                    removeComponentFromPv(pvName, compId);
                }
            }
            //If there are no more components associated with the PV,
            //close subscription
            if (pvToComponentMap[pvName].length === 0) {
                closeSubscription(pvName);
            }
        }
        break;
    }

    case UNSUBSCRIBE_ALL: {
        //Outer loop through the PVs in pv-comp map
        for (let pvName in pvToComponentMap) {
            //Inner loop through the component Ids for a given PV
            for (let compId in pvToComponentMap[pvName]) {
                //remove each components from its associate PV
                removeComponentFromPv(pvName, compId);
            }
            //Empty the PV to Malc map and close the websocket
            closeSubscription(pvName);
        }
        break;
    }
    //If the action type doesn't match any of these cases, forward it
    //to our reducer.
    default: {
        next(action);
    }
    }
};

export default websockMiddleware;


//
//Helper functions:
//

//Remove a component from the list of active listeners of a given PV.
function removeComponentFromPv(pvName, compId) {
    const removeThis = pvToComponentMap[pvName].indexOf(compId);
    pvToComponentMap[pvName].splice(removeThis, 1);
}

//If the PV - MalcolmID map contains information on a subscription, use that information
//to close the subscription. Then, remove the closed subscription from the PV-MalcID map
function closeSubscription(pvName) {
    if (Object.keys(pvToMalcolmIDMap).includes(pvName)) {
        connectionObject.destroyMonitor(pvToMalcolmIDMap[pvName]);
        delete pvToMalcolmIDMap[pvName];
    }
    closeWebsocket();
}

//If there are no subscriptions, close the websocket.
function closeWebsocket() {
    if (Object.keys(pvToMalcolmIDMap).length === 0) {
        connectionObject.closeWebsocket();
    } // else: there are still subs so keep it open
}





