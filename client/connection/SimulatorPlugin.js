export class SimulatorPlugin {
    constructor(callback) {
        this.callback = callback;
    }

    subscribe(id, pv) {
        console.log(`Subscribing to ${pv}`);
        if (typeof pv != 'undefined') {
            setInterval(() => {
                this.callback(pv, Math.random());
            }, 1000);
        }
    }

    unsubscribe(id, pv) {
        console.log(`Unsubscribing from ${pv}`);
    }

    disconnect() {
        console.log('Disconnecting simulator');
    }
}