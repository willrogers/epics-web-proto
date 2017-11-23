const webSocketURL = 'ws://pc0088:8080/ws';

const subMethod = 'malcolm:core/Subscribe:1.0';
const unsubMethod = 'malcolm:core/Unsubscribe:1.0';
const putMethod = 'malcolm:core/Put:1.0';
const updateMethod = 'malcolm:core/Update:1.0';
const returnMethod = 'malcolm:core/Return:1.0';

import {receiveUpdate} from './ServerInterface.js';


export class MalcolmConnection {

    constructor() {
        this.connect();
    }

    connect() {
        this.connection = new WebSocket(webSocketURL);
    }

    disconnect() {
        this.connection.close();
    }

    subscribe(component) {
        //create subscriptionJSON
        let subscribeRequest = JSON.stringify({
            'typeid': subMethod,
            'id': component.id,
            'path': [component.props.block, component.props.property]
        });

        //Send sub request
        malcConnection.send(subscribeRequest);

        //Listen for responses
        malcConnection.onmessage = (message) => {
            const response = JSON.parse(message.data);
            const newMalcolmValue = response.value.value;
            this.update(newMalcolmValue);
        };
    }

    unsubscribe() {

    }

    //Pass to the action creator
    update(newVal) {
        //send to interface which will forward to action creator
        this.receiveUpdate(newVal);
    }



}
