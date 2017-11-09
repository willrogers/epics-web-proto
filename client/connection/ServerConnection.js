import {updatePV} from '../actions/EPICSActions.js';
//import {ServerSubscription} from './ServerSubscription.js'
const webSockAddress = 'ws://localhost:8080/ws';
const malcolmSubscribeMethod = 'malcolm:core/Subscribe:1.0';

export class ServerConnection {
    constructor() {
        this.wsConnection = new WebSocket(webSockAddress);
    }

    createSubscription(comp) {
        console.log("comp:")
        console.log(comp)
        console.log("wsConnection:")
        console.log(this.wsConnection)

        var subscribeRequest = this.generateSubscriptionJSON(comp);


        console.log("subscribeRequest:")
        console.log(subscribeRequest)
        this.wsConnection.send(subscribeRequest);
        this.wsConnection.onmessage = (message)=>{
            var response = JSON.parse(message.data);
            var newMalcolmValue = response.value.value;
            updatePV(newMalcolmValue, this.comp.props.property);
        };
    }

    generateSubscriptionJSON(comp) {
        var subJSON = JSON.stringify({
            'typeid': malcolmSubscribeMethod,
            'id': comp.id,
            'path': [
                comp.props.block,
                comp.props.property
            ]
        });
        console.log("subJSON:")
        console.log(subJSON)
        return subJSON;
    }

}
