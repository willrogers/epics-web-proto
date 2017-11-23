const webSocketURL = 'ws://pc0088:8080/ws';

const subMethod = 'malcolm:core/Subscribe:1.0';
const unsubMethod = 'malcolm:core/Unsubscribe:1.0';
const putMethod = 'malcolm:core/Put:1.0';
const updateMethod = 'malcolm:core/Update:1.0';
const returnMethod = 'malcolm:core/Return:1.0';

export class MalcolmConnection {

    constructor(callback) {

        this.callback = callback;
        //Open the WS Connection
        this.malcConnection = new WebSocket(webSocketURL);

        //Create cache
        this.cachedSubscribeRequests = [];

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

    disconnect() {
        this.malcConnection.close();
    }

    subscribe(component) {

        this.pvIds[component.id] = component.props.property;

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

    unsub(id) {

        console.log('id in unsub: ');
        console.log(id);

        const unsubJSON = JSON.stringify({
            'typeid': unsubMethod,
            'id': id
        });


        console.log('unsub json');
        console.log(unsubJSON);

        this.malcConnection.send(unsubJSON);
    }

    //Pass to the action creator
    update(newVal, pvName) {
        this.callback(newVal, pvName);
    }

}
