
//Server implementation/plugin is defined here
import {MalcolmConnection} from './MalcolmPlugin.js';
import {updatePV} from '../actions/EPICSActions.js';

export  class ServerInterface {

    constructor() {
        this.serverConnection = new MalcolmConnection();

    }

    createSubscription(component) {
        // call the sub method for the given plugin and pass it the comp that
        // wants to subscribe.
        this.serverConnection.subscribe(component);
    }

    destroySubscription(component) {
        // call the unsub method for the given plugin and pass it the comp that
        // wants to unsubscribe.
        this.serverConnection.unsubscribe(component);
    }

    receiveUpdate(newValue, pvToUpdate) {
        // Should send the information toward the action creator
        updatePV(newValue, pvToUpdate);
    }

    getPV() {
        this.serverConnection.getPV(desiredPV);
    }

    putPV(newValue, writeToThisPV) {
        this.serverConnection.putPV(newValue, writeToThisPV);
    }

}






//unsubscribe()
//get()
//put()
//disconnect()