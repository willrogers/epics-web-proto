import {updatePV} from '../actions/epics-actions';
import {Epics2WebPlugin} from './epics2web-plugin';
import {SimulatorPlugin} from './simulator-plugin';


//A generic class to hook a server into EpicsWebProto. Exposes the methods
//to obtain data from and present data to a server
export class ServerInterface {

    //Create a new connection using the chosen plugin
    constructor(websocketURL, pluginType) {

        //Create your plugin and pass it the receiveUpdate callback
        //along with your websocket
        if (pluginType === 'simulator') {
            this.serverConnection = new SimulatorPlugin(this.receiveUpdate);
        } else if (pluginType === 'epics2web') {
            this.serverConnection = new Epics2WebPlugin(this.receiveUpdate, websocketURL);
        }
    }
    //Calls the plugin method for subscribing to a PV.
    monitorPV(id, pv) {
        this.serverConnection.subscribe(id, pv);
    }

    //Calls the plugin method for unsubscribing to a PV, requires
    //an id for the component which needs to stop subscribing.
    destroyMonitor(id) {
        this.serverConnection.unsubscribe(id);
    }

    //Call the plugin method to get a single reading of a PV.
    getPV(id, block, property) {
        this.serverConnection.getPV(id, block, property);
    }

    //Call the plugin method for writing a single value to a PV
    putPV(pv, value) {
        this.serverConnection.putPV(pv, value);
    }

    //Call the plugin method for closing the websocket
    closeWebsocket() {
        this.serverConnection.disconnectWebsocket();
    }

    //Kill all subscriptions.
    destroyAllMonitors() {
        this.pvsToKill = this.serverConnection.pvIds;
        for(let i in this.pvsToKill) {
            this.destroyMonitor(parseInt(i));
        }
    }

    //Receive a PV update.
    receiveUpdate(pvName, newValue) {
        // Send to the action creator
        updatePV(pvName, newValue);
    }

}
