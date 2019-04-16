import {SimulatorPlugin} from '../src/connection/SimulatorPlugin.js';


jest.useFakeTimers();

const LOC_PV_NAME = 'loc://dummypv';

describe('SimulatorPlugin', () => {
    let callbackSpy;
    let simPlugin;
    beforeEach(() => {
        callbackSpy = jest.fn();
        simPlugin = new SimulatorPlugin(callbackSpy);
    });

    it('should store zero in a local PV when subscribing', () => {
        simPlugin.subscribe('id', LOC_PV_NAME);
        expect(simPlugin.getValue(LOC_PV_NAME)).toEqual(0);
    });

    it('should store a value in a local PV', () => {
        const value = 1;
        simPlugin.putPV(LOC_PV_NAME, value);
        expect(simPlugin.getValue(LOC_PV_NAME)).toEqual(value);
    });

    it('should store a string in a local pv', () => {
        const value = 'hello';
        simPlugin.putPV(LOC_PV_NAME, value);
        expect(simPlugin.getValue(LOC_PV_NAME)).toEqual(value);
    });

    it('should set a timer when subscribing to a pv', () => {
        simPlugin.subscribe('id', 'dummy_pv');
        expect(setInterval).toHaveBeenCalledTimes(1);
    });

    const numericPvs = ['sim://sine', 'sim://random'];
    it.each(numericPvs)('should return a number from %s', (pv) => {
        const simPlugin = new SimulatorPlugin(callbackSpy);
        expect(typeof simPlugin.getValue(pv)).toEqual('number');
    });
});