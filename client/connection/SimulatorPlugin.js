export class SimulatorPlugin {
    constructor(callback) {
        this.callback = callback;
        this.localPvs = {};
    }

    subscribe(id, pv) {
        console.log(`Subscribing to ${pv}`);
        if (typeof pv != 'undefined' && pv.startsWith('loc://')) {
            this.localPvs[pv] = 0;
        }
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
        if (pv.startsWith('loc://')) {
            this.localPvs[pv] = newValue.toString();
        } else {
            console.log(`Simulator: not writing PV ${pv}:${newValue}`);
        }
    }

    getValue(pv) {
        if (pv.startsWith('loc://')) {
            return this.localPvs[pv];
        } else if (pv === 'sim://sine') {
            let val = Math.sin(new Date().getSeconds() + new Date().getMilliseconds() * 0.001);
            return val;
        } else if (pv === 'sim://random') {
            return Math.random();
        }
    }
}