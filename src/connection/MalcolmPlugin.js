//Import the action creator for updating WS status
import {updateWebSockStatus} from '../actions/EPICSActions';

//Define malcolm message typeids
const putMethod = 'malcolm:core/Put:1.0';
const getMethod = 'malcolm:core/Get:1.0';
const subscribeMethod = 'malcolm:core/Subscribe:1.0';
const unsubMethod = 'malcolm:core/Unsubscribe:1.0';

export class MalcolmConnection {

    constructor(callback, websocket) {

        this.updateCallback = callback; //serverInterface.receiveUpdate()
        this.websocket = websocket; //Create a local reference to the Websocket held in ServerInterface
        this.cachedRequests = []; // Requests made before WS open
        this.pvIds = {}; // Link the pv to an id for tracking
        this.connect(); //Start the connection
        this.registerListener(); //Create the listeners for responses from malcolm
    }


    //Event listeners for reacting to Websocket connection behaviour
    connect() {
        //When the websocket opens..
        this.websocket.onopen = () => {
            //..loop through the cached requests..
            for (let i = 0; i < this.cachedRequests.length; i++) {
                //..send the cached requests..
                this.websocket.send(this.cachedRequests[i]);
                //..send an action that contains the current state of the websocket
                updateWebSockStatus(this.websocket.readyState);
            }
            //When the websocket closes..
            this.websocket.onclose = () =>{
                //..send an action that contains the current state of the websocker.
                updateWebSockStatus(this.websocket.readyState);
            };
        };
    }


    //Creates an event listener for reacting to responses from Malcolm
    registerListener() {
        //When we get a message from Malcolm..
        this.websocket.onmessage = (message) => {

            //..extract the data from the message JSON
            const response = JSON.parse(message.data);
            //..extract the value from the data
            const newMalcolmValue = response.value.value;
            //..pass the value and its associated id back to EpicsWebProto
            this.updateCallback(this.pvIds[response.id], newMalcolmValue);
        };
    }


    //Interface methods to hook to EpicsWebProto, called from ServerInterface
    subscribe(id, block, property) {
        //Link an ID to the property of a malcolm part, used for tracking
        this.pvIds[id] = property;
        //Send A request for subscription based on the supplied path.
        this.sendRequest(this.generateRequest(subscribeMethod, id, block, property));
    }

    //Send a request to kill the subscription with the given ID.
    unsubscribe(id) {
        this.sendRequest(this.generateRequest(unsubMethod, id));
    }

    //Send a request to get a value from the given malcolm part.
    getPV(id, block, property) {
        this.sendRequest(this.generateRequest(getMethod, id, block, property));
    }

    //Send a request to write a value to the given malcolm part.
    putPV(id, block, property, value) {
        this.sendRequest(this.generateRequest(putMethod, id, block, property, value));
    }
    //Close the websocket connection
    disconnectWebsocket() {
        this.websocket.close();
    }

    //Send a request to malcolm
    sendRequest(request) {
        //If the websocket is open
        if (this.websocket.readyState === 1) {
            //..send the request
            this.websocket.send(request);
        } else {
            //if not, add the request to the cache of unsent requests.
            this.cachedRequests.push(request);
        }
    }

    //Check typeid, generate appropriate JSON.
    generateRequest(typeid, id, block, property, val) {

        let request = {};
        if (typeid === putMethod) {
            request = JSON.stringify({
                'typeid': typeid,
                'id': id,
                'path': [block, property],
                'value': val
            });
        } else if (typeid === unsubMethod) {
            request = JSON.stringify({
                'typeid': typeid,
                'id': id
            });
        } else /* typeid is sub or get, common structure */ {
            request = JSON.stringify({
                'typeid': typeid,
                'id': id,
                'path': [block, property]
            });
        }
        return request;
    }

}
