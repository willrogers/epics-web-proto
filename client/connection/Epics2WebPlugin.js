import jlab from '../external/epics2web.js';
import {updateWebSockStatus} from "../actions/EPICSActions";

export class Epics2WebPlugin {

    constructor(callback, websocketUrl) {
        this.callback = callback;

        this.cachedRequests = [];
        this.open = false;

        this.connection = new jlab.epics2web.ClientConnection(
            {
                url: websocketUrl
            }
        );
        var self = this;
        this.connection.onopen = (event) => {
            this.open = true;
            updateWebSockStatus("open")

            if (this.cachedRequests.length != 0) {
                this.connection.monitorPvs(this.cachedRequests);
            }

            self.connection.onupdate = (message) => {
                this.update(message.detail.value, message.detail.pv);
            };
        };
        this.connection.onclose = (event) => {
            updateWebSockStatus("closed");
        };
    }

    disconnect() {
        this.connection.close();
    }

    subscribe(id, pv) {
        if (! this.open) {
            this.cachedRequests.push(pv);
        } else {
            this.connection.monitorPvs([pv]);
        }
    }

    unsubscribe(id) {
        this.connection.clearPvs([id]);
    }

    update(newVal, pvName) {
        this.callback(newVal, pvName);
    }

    disconnectWebSocket() {
        this.connection.close();
    }

}