
//Server implementation/plugin is defined here
import {MalcolmConnection} from './MalcolmPlugin.js';
import {updatePV} from '../actions/EPICSActions.js';

export class ServerInterface {

    constructor() {
        this.serverConnection = new MalcolmConnection(this.receiveUpdate);
    }

    monitorPV(component) {
        // call the sub method for the given plugin and pass it the comp that
        // wants to subscribe.
        this.serverConnection.subscribe(component);
    }

    destroyMonitor(id) {
        // call the unsub method for the given plugin and pass it the comp that
        // wants to unsubscribe.
        this.serverConnection.unsub(id);
    }

    getPV(desiredPV) {
        this.serverConnection.getPV(desiredPV);
    }

    putPV(newValue, writeToThisPV) {
        this.serverConnection.putPV(newValue, writeToThisPV);
    }

    receiveUpdate(newValue, pvName) {

        // Should send the information toward the action creator
        updatePV(newValue, pvName);

    }

}