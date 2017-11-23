const webSocketURL = 'ws://pc0088:8080/ws';

const subMethod = 'malcolm:core/Subscribe:1.0';
const unsubMethod = 'malcolm:core/Unsubscribe:1.0';
const putMethod = 'malcolm:core/Put:1.0';
const updateMethod = 'malcolm:core/Update:1.0';
const returnMethod = 'malcolm:core/Return:1.0';

import ServerInterface from './ServerInterface.js';


export class MalcolmConnection {

    constructor() {
        //Open the WS Connection
        this.malcConnection = new WebSocket(webSocketURL);

        //Create cache
        this.cachedSubscribeRequests = [];

        //Create the listener for responses
        this.malcConnection.onmessage = (message) => {
            const response = JSON.parse(message.data);
            const newMalcolmValue = response.value.value;
            this.update(newMalcolmValue);
        };
    }

    disconnect() {
        this.malcConnection.close();
    }

    subscribe(component) {
        //create subscriptionJSON
        const subscribeRequest = JSON.stringify({

            'typeid': subMethod,
            'id': component.id,
            'path': [component.props.block, component.props.property]

        });

        //Send sub request or add to cache
        if (this.malcConnection.readyState === 1) {
            this.malcConnection.send(subscribeRequest);
        } else {
            this.cachedSubscribeRequests.push(subscribeRequest);
        }
    }

    unsubscribe(id) {
        const unsubJSON = JSON.stringify({
            'typeid': unsubMethod,
            'id': id
        });

        this.malcConnection.send(unsubJSON);
    }

    //Pass to the action creator
    update(newVal) {
        //send to interface which will forward to action creator.
        ServerInterface.receiveUpdate(newVal);
    }


}
