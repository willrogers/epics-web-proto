import {Epics2WebPlugin} from "../client/connection/Epics2WebPlugin";
import jlab from "../client/external/epics2web";

import sinon from 'sinon';
import {expect} from 'chai';


describe('Epics2WebPlugin', () => {

    const connectionSpy = sinon.stub(jlab.epics2web, "ClientConnection");
    const callbackSpy = sinon.spy();
    const websocketUrl = 'ws://dummy.com'

    it('should construct', () => {
        const e2w = new Epics2WebPlugin(callbackSpy, websocketUrl);
    });

    it('should disconnect', () => {
        const e2w = new Epics2WebPlugin(callbackSpy, websocketUrl);
        e2w.connection.close = () => {};
        const closeSpy = sinon.spy(e2w.connection, "close");
        e2w.disconnect();
        expect(closeSpy).to.have.been.calledOnce;
    })

});