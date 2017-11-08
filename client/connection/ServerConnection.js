//Malcolm stuffs
//Holds a websocket connection
//Will get called on component instantiation to make a subscription
//onMessage: create an action to dispatch to the store
import {updatePV} from '../actions/EPICSActions.js';
const webSockAddress = 'ws://localhost:8080/ws';
const malcolmSubscribeMethod = 'malcolm:core/Subscribe:1.0';
const value = 'value';


export class ServerConnection {

    constructor(comp) {
        this.componentObject = comp;
        this.createConnection();
    }

    createConnection() {
        this.connection = new WebSocket(webSockAddress);
        this.connection.onopen = ()=> {
            console.log("WebSocket connection opened")
            this.createSubscription();
        };
        
    }

    createSubscription() {
        console.log("createSub compObj:" )
        console.log(this.componentObject)

        this.connection.send(this.generateSubscriptionJSON(this.componentObject));
        this.connection.onmessage = (message)=>{
            var response = JSON.parse(message.data); 
            var newMalcolmValue = response.value;
            updatePV(newMalcolmValue);
        };
    }

    generateSubscriptionJSON(){
    
        var subJSON = JSON.stringify({
            'typeid': malcolmSubscribeMethod,
            'id': this.componentObject.currentID,
            'path': [ this.componentObject.props.block, this.componentObject.props.property, value ]
        })
        return subJSON;
    }

}
