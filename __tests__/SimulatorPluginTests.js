import {SimulatorPlugin} from '../client/connection/SimulatorPlugin.js';


jest.useFakeTimers();


describe('SimulatorPlugin', () => {
    const callbackSpy = jest.fn();

    it('should construct', () => {
        const simPlugin = new SimulatorPlugin(callbackSpy);
    });

    it('should store zero in a local PV when subscribing', () => {
        const simPlugin = new SimulatorPlugin(callbackSpy);
        const pvName = 'loc://dummypv';
        simPlugin.subscribe('id', pvName);
        expect(simPlugin.getValue(pvName)).toEqual(0);
    });

    it('should store a value in a local PV', () => {
        const simPlugin = new SimulatorPlugin(callbackSpy);
        const pvName = 'loc://dummypv';
        const value = 1;
        simPlugin.putPV(pvName, value);
        expect(simPlugin.getValue(pvName)).toEqual(value);
    });

    it('should set a timer when subscribing to a pv', () => {
        const simPlugin = new SimulatorPlugin(callbackSpy);
        const pvName = 'dummypv';
        simPlugin.subscribe('id', pvName);
        expect(setInterval).toHaveBeenCalledTimes(1);
    });

    const numericPvs = ['sim://sine', 'sim://random'];
    it.each('should return a number from numeric PV', (pv) => {
        const simPlugin = new SimulatorPlugin(callbackSpy);
        expect(typeof simPlugin.getValue(pv)).toBe('number');

    })
});