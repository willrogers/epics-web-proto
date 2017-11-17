import {updatePV} from '../actions/EPICSActions.js';

const malcolmSubscribeMethod = 'malcolm:core/Subscribe:1.0';
const malcolmUnsubscribeMethod = 'malcolm:core/Unsubscribe:1.0';

export class ServerConnection {


    constructor(websocket_url) {
        /*Create the WS obj*/
        this.wsConnection = new WebSocket(websocket_url);

        /* Store the pvs and ids, so that when a message comes back with a
         * particular id, we know which pv to associate it with. */
        this.pvIds = {};

        /* Create a list to populate with requests that are made before the
        * connection is open*/
        this.cachedSubscribeRequests = [];

        /* When we receive a message: extract the pv value and pass to the
        * update method - then figure out which pv name which which it is
        * associated by performing a lookup in the pvIDs array*/
        this.wsConnection.onmessage = (message) => {
            const response = JSON.parse(message.data);
            const newMalcolmValue = response.value.value;

            /* Figure out the correct pv given the response id */
            updatePV(newMalcolmValue, this.pvIds[response.id]);
        };

        /*When the websocket is open...*/
        this.wsConnection.onopen = () => {

            /*...send all the messages that have been cached */
            for (let i = 0; i < this.cachedSubscribeRequests.length; i++) {
                this.wsConnection.send(this.cachedSubscribeRequests[i]);
            }
        };
    }


    createSubscription(comp) {
        /*Create a subscribe request based on the given component*/
        const subscribeRequest = this.generateSubscriptionJSON(comp);

        /* If the websocket is ready, send the message...*/
        if (this.wsConnection.readyState === 1) {
            this.wsConnection.send(subscribeRequest);

        /* Otherwise, add to the list of messages to be sent onopen */
        } else {
            this.cachedSubscribeRequests.push(subscribeRequest);
        }
    }


    generateSubscriptionJSON(comp) {
        const subJSON = JSON.stringify({
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


    generateUnsubJSON(id) {
        //Create the following JSON and convert it to a malcolm-friendly string
        const unsubJSON = JSON.stringify({
            'typeid': malcolmUnsubscribeMethod,
            'id': id
        });
        return unsubJSON;
    }


    unsubscribe(id) {
        const unsubJSON = this.generateUnsubJSON(id);
        if (this.wsConnection.readyState === 1) {
            this.wsConnection.send(unsubJSON);
        }
    }
}
