import jlab from '../external/epics2web.js';
import {updateWebSockStatus} from '../actions/EPICSActions';

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
        let self = this;
        this.connection.onopen = (_) => {
            this.open = true;
            updateWebSockStatus('open');

            if (this.cachedRequests.length != 0) {
                this.connection.monitorPvs(this.cachedRequests);
            }

            self.connection.onupdate = (message) => {
                this.update(message.detail.pv, message.detail.value);
            };
        };
        this.connection.onclose = (_) => {
            updateWebSockStatus('closed');
        };
    }

    disconnect() {
        this.connection.close();
    }

    subscribe(_, pv) {
        if (! this.open) {
            this.cachedRequests.push(pv);
        } else {
            this.connection.monitorPvs([pv]);
        }
    }

    unsubscribe(id) {
        this.connection.clearPvs([id]);
    }

    update(pvName, newVal) {
        this.callback(pvName, newVal);
    }

    disconnectWebSocket() {
        this.connection.close();
    }

}