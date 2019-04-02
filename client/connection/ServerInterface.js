import {updatePV} from '../actions/EPICSActions.js';

//Server implementation/plugin is defined here:
import {Epics2WebPlugin} from './Epics2WebPlugin.js';
import {SimulatorPlugin} from './SimulatorPlugin';


//A generic class to hook a server into EpicsWebProto. Exposes the methods
//to obtain data from and present data to a server
export class ServerInterface {

    //Create a new connection using the chosen plugin
    constructor(webSocketURL, pluginType) {

        //Create a websocket with the URL passed from top level
        console.log(`the url is ${webSocketURL}`);
        //this.webSocket = new WebSocket(webSocketURL);
        console.log('aaa');
        //Create your plugin and pass it the receiveUpdate callback
        //along with your websocket
        if (pluginType === 'simulator') {
            this.serverConnection = new SimulatorPlugin(this.receiveUpdate);
        } else if (pluginType === 'epics2web') {
            this.serverConnection = new Epics2WebPlugin(this.receiveUpdate, webSocketURL);
        }
    }

    //Calls the plugin method with the specific Malcolm path
    //required for subscription
    monitorPV(id, pv) {
        this.serverConnection.subscribe(id, pv);
    }

    //Calls the plugin method for unsubscribing to a PV, requires
    //an id for the component which needs to stop subscribing.
    destroyMonitor(id) {
        this.serverConnection.unsubscribe(id);
    }

    //Call the plugin method to get a single reading of a PV.
    //Useful for minimum and maximum values. Takes the malcolm path
    //to the desired pv as a parameter
    getPV(id, block, property) {
        this.serverConnection.getPV(id, block, property);
    }

    //Call the plugin method for writing a single value to a PV
    putPV(pv, value) {
        this.serverConnection.putPV(pv, value);
    }

    //Call the plugin method for closing the websocket
    closeWebsocket() {
        this.serverConnection.disconnectWebSocket();
    }

    //Kill all subscriptions. Loop through the map of subscriptions,
    // taken from pvIds in malcolmPlugin
    destroyAllMonitors() {
        this.pvsToKill = this.serverConnection.pvIds;
        for(let i in this.pvsToKill) {
            this.destroyMonitor(parseInt(i));
        }
    }

    //Receive an update from Malcolm, passed to malcolmConnection as a callback
    receiveUpdate(pvName, newValue) {
        // Send to the action creator
        updatePV(pvName, newValue);

    }

}
