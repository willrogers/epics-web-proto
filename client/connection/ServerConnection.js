//Malcolm stuffs
//Holds a websocket connection
//Will get called on component instantiation to make a subscription
//onMessage: create an action to dispatch to the store

//import {store} from '../../redux/EPICSStore.js';
import {receivePVUpdate} from '../actions/EPICSActions.js';


const webSockAddress = 'ws://localhost:8080/ws';
const subscriptionJSON = JSON.stringify({
    'typeid' : 'malcolm:core/Subscribe:1.0',
    'id' : 1,
    'path' : [ 'SIGNAL', 'signal', 'value' ]
});

export class ServerConnection {

    constructor(){
        this.connection = new WebSocket(webSockAddress);
        this.connection.onopen = ()=>{
            this.createSubscription();
        };
    }

    createSubscription() {
        this.connection.send(subscriptionJSON);
        this.connection.onmessage = (message)=>{
            var response = JSON.parse(message.data);
            var newMalcolmValue = response.value;
            receivePVUpdate(newMalcolmValue);
        };
    }

}
