const malcolmSubscribeMethod = 'malcolm:core/Subscribe:1.0';

export class ServerSubscription {

    constructor(){
        console.log("I am a serverSubscription")
    }

    //TODO: Make a subscription action to go round the loop as well.
    createSubscription(comp) {
        this.connection.send(this.generateSubscriptionJSON());
        this.connection.onmessage = (message)=>{
            var response = JSON.parse(message.data);
            var newMalcolmValue = response.value.value;
            updatePV(newMalcolmValue, this.componentObject.props.property);
        };
    }

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