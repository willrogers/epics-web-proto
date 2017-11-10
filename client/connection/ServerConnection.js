import {updatePV} from '../actions/EPICSActions.js';
const webSockAddress = 'ws://localhost:8080/ws';
const malcolmSubscribeMethod = 'malcolm:core/Subscribe:1.0';

export class ServerConnection {

    constructor(comp) {
        this.componentObject = comp;
        this.createConnection();
    }

    createConnection() {
        this.connection = new WebSocket(webSockAddress);
        this.connection.onopen = ()=> {
            this.createSubscription();
        };
    }

    //TODO: Make a subscription action to go round the loop as well.
    createSubscription() {
        this.connection.send(this.generateSubscriptionJSON());
        this.connection.onmessage = (message)=>{
            var response = JSON.parse(message.data);
            var newMalcolmValue = response.value.value;
            updatePV(newMalcolmValue, this.componentObject.props.property);
        };
    }

    unsubscribe(){} 

    generateSubscriptionJSON() {
        var subJSON = JSON.stringify({
            'typeid': malcolmSubscribeMethod,
            'id': this.componentObject.id,
            'path': [
                this.componentObject.props.block,
                this.componentObject.props.property
            ]
        });
        return subJSON;
    }



}
