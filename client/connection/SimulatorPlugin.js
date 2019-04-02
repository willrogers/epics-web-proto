export class SimulatorPlugin {
    constructor(callback) {
        this.callback = callback;
    }

    subscribe(id, pv) {
        console.log(`Subscribing to ${pv}`);
        if (typeof pv != 'undefined') {
            setInterval(() => {
                this.callback(pv, this.getValue(pv));
            }, 300);
        }
    }

    unsubscribe(id, pv) {
        console.log(`Unsubscribing from ${pv}`);
    }

    disconnect() {
        console.log('Disconnecting simulator');
    }

    putPV(pv, newValue) {
        console.log(`Simulator: not writing PV ${pv}:${newValue}`);
    }

    getValue(pv) {
        if (pv === 'sim://sine') {
            return Math.sin(new Date().getSeconds() + new Date().getMilliseconds() * 0.001);
        } else if (pv === 'sim://random') {
            return Math.random();
        }
    }
}