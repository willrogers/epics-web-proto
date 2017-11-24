import {MalcolmConnection} from './../client/connection/MalcolmPlugin.js';
import {expect} from 'chai';
import sinon from 'sinon';
import enzyme from 'enzyme';


const WebSocketURL = 'ws://pc0088:8080/ws';

describe('MalcolmPlugin', function() {

    const spyCallback = sinon.spy();
    const testPlugin = new MalcolmConnection(spyCallback, WebSocketURL);

    it('should be an object', function(){
        expect(testPlugin.subscribe().exists()).to.be(true);
    });

    it('Should call the callback passed to it with data from Malcolm', function() {
        //Not sure how to 'fake' a message from malcolm, we have come across this
        //problem before and decided not to tackle it.
        //The only thing I can think of is to somehow mock the 'onmessage' call from
        //a websocket - potentially using something like project-react's fake submission.
    });

});