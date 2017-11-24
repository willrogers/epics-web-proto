const webSocketURL = 'ws://pc0088:8080/ws';

const subMethod = 'malcolm:core/Subscribe:1.0';
const unsubMethod = 'malcolm:core/Unsubscribe:1.0';
const putMethod = 'malcolm:core/Put:1.0';
const updateMethod = 'malcolm:core/Update:1.0';
const returnMethod = 'malcolm:core/Return:1.0';

export class MalcolmConnection {


    constructor(callback) {


        //Callback supplied by serverInterface - allows for receipt
        // of values from malc
        this.callback = callback;

        //Open the WS Connection
        this.malcConnection = new WebSocket(webSocketURL);

        //Create cache
        this.cachedSubscribeRequests = [];

        //Create the map of pv ids to pc names, so we can determine what pv
        // belongs to which subscription owner
        this.pvIds = {};

        /*When the websocket is open...*/
        this.malcConnection.onopen = () => {
            /*...send all the messages that have been cached */
            for (let i = 0; i < this.cachedSubscribeRequests.length; i++) {
                this.malcConnection.send(this.cachedSubscribeRequests[i]);
            }
        };

        //Create the listener for responses
        this.malcConnection.onmessage = (message) => {
            const response = JSON.parse(message.data);
            const newMalcolmValue = response.value.value;
            this.update(newMalcolmValue, this.pvIds[response.id]);
        };
    }

    //To close the WebSocket and cease communication. Called on app shutdown
    //
    disconnect() {
        this.malcConnection.close();
    }

    // ID: Identifier of the entity that is subscribing - who wants the info
    // Block: Top level malcolm data structure
    // Property: Refers to a specific part of the Block
    subscribe(id, block, property) {

        //Associate this subscription ID with the name of the pv
        //it is requesting (property)
        this.pvIds[id] = property;

        //create subscriptionJSON
        const subscribeRequest = JSON.stringify({
            'typeid': subMethod,
            'id': id,
            'path': [block, property]
        });

        //Send sub request, or add to cache if WS is not ready
        if (this.malcConnection.readyState === 1) {
            this.malcConnection.send(subscribeRequest);
        } else {
            this.cachedSubscribeRequests.push(subscribeRequest);
        }
    }

    //Kill the subscription to malcolm. Called on page unload or refresh
    unsub(id) {

        //make the unsubJson
        const unsubJSON = JSON.stringify({
            'typeid': unsubMethod,
            'id': id
        });

        //Make sure the websocket can accept messages, if so, send one
        if (this.malcConnection.readyState === 1) {
            this.malcConnection.send(unsubJSON);
        }
    }

    //Invoke the callback supplied by ServerInterface (receiveUpdate)
    //This is so that we can send values back from malcolm
    update(newVal, pvName) {
        //Callback is ServerInterface.receiveUpdate()
        this.callback(newVal, pvName);
    }

}
