import {Epics2WebPlugin} from '../src/connection/epics2web-plugin';
import jlab from '../src/external/epics2web';


describe('Epics2WebPlugin', () => {

    // Mock ClientConnection
    jlab.epics2web.ClientConnection = jest.fn();
    const callbackSpy = jest.fn();
    const websocketUrl = 'ws://dummy.com';

    it('should construct', () => {
        new Epics2WebPlugin(callbackSpy, websocketUrl);
    });

    it('should disconnect', () => {
        const e2w = new Epics2WebPlugin(callbackSpy, websocketUrl);
        e2w.connection.close = () => {};
        const closeSpy = e2w.connection.close = jest.fn();
        e2w.disconnect();
        expect(closeSpy).toHaveBeenCalledTimes(1);
    });

});