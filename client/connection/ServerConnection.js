//Malcolm stuffs
//Holds a websocket connection
//Will get called on component instantiation to make a subscription
//onMessage: create an action to dispatch to the store

import {updatePV} from '../actions/EPICSActions.js';


const webSockAddress = 'ws://localhost:8080/ws';

const subscriptionJSON = JSON.stringify({
    'typeid' : 'malcolm:core/Subscribe:1.0',
    'id' : 1,
    'path' : [ 'SIGNAL', 'signal', 'value' ]
});

export class ServerConnection {

    constructor() {
        createConnection();
    }

    createConnection() {
        this.connection = new WebSocket(webSockAddress);
        this.connection.onopen = ()=>{
            this.createSubscription();
        };
        
    }

    createSubscription() {

            const subscriptionJSON = JSON.stringify({
                'typeid' : malcolmMethod,
                'id' : 1, //This should be taken from the component ID
                'path' : [ 'SIGNAL', 'signal', 'value' ]
            });

        this.connection.send(subscriptionJSON);
        this.connection.onmessage = (message)=>{
            var response = JSON.parse(message.data);
            var newMalcolmValue = response.value;
            updatePV(newMalcolmValue);
        };
    }

}
