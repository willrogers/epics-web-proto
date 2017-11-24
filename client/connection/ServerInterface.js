import {updatePV} from '../actions/EPICSActions.js';

//Server implementation/plugin is defined here:
import {MalcolmConnection} from './MalcolmPlugin.js';


//A generic class to hook a server into EpicsWebProto. Exposes the methods
//to obtain data from and present data to a server
export class ServerInterface {

    //Create a new connection using the chosen plugin
    constructor(webSocketURL) {

        //Create your plugin as server connection and pass it the
        //receiveUpdate callback
        this.serverConnection = new MalcolmConnection(this.receiveUpdate, webSocketURL);
    }

    //Listen to a PV
    monitorPV(id, block, property) {
        this.serverConnection.subscribe(id, block, property);
    }

    //Stop listening to a PV
    destroyMonitor(id) {
        this.serverConnection.unsub(id);
    }

    //Get the desired PV
    getPV(desiredPV) {
        this.serverConnection.getPV(desiredPV);
    }

    //Write to the desired PV
    putPV(newValue, writeToThisPV) {
        this.serverConnection.putPV(newValue, writeToThisPV);
    }

    //Receive an update from Malcolm
    receiveUpdate(newValue, pvName) {

        // Send to action creator
        updatePV(newValue, pvName);

    }

}