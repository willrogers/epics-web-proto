import {updatePV} from '../actions/EPICSActions.js';
const webSockAddress = 'ws://pc0088:8080/ws';
const malcolmSubscribeMethod = 'malcolm:core/Subscribe:1.0';

export class ServerConnection {

    constructor() {
        this.wsConnection = new WebSocket(webSockAddress);
        /* Store the pvs and ids, so that when a message comes back with a
         * particular id, we know which pv to associate it with. */
        this.pvIds = {};
        this.cachedSubscribeRequests = [];
        this.wsConnection.onmessage = (message)=>{
            var response = JSON.parse(message.data);
            var newMalcolmValue = response.value.value;
            /* Figure out the correct pv given the response id */
            updatePV(newMalcolmValue, this.pvIds[response.id]);
        };
        this.wsConnection.onopen = () => {
            /* When the websocket opens, send all the messages that have been cached */
            for (var i = 0; i < this.cachedSubscribeRequests.length; i++) {
                this.wsConnection.send(this.cachedSubscribeRequests[i]);
            }
        }
    }

    createSubscription(comp) {
        var subscribeRequest = this.generateSubscriptionJSON(comp);
        /* If the websocket is ready, send the message. Otherwise, add to the
         * list of messages to be sent. */
        if (this.wsConnection.readState === 1) {
            this.wsConnection.send(subscribeRequest);
        } else {
            this.cachedSubscribeRequests.push(subscribeRequest);
        }
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
        /* Associate this pv with the correct id */
        this.pvIds[comp.id] = comp.props.property;
        return subJSON;
    }

}
