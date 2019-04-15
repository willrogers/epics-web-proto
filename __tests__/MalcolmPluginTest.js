import {MalcolmConnection} from './../src/connection/MalcolmPlugin.js';

// This file includes tests on MalcolmConnection, which is not a react
// component - the tests on this object are therefore using regular JS syntax

describe('MalcolmPlugin', function() {

    const spyCallback = jest.fn();
    //This is just a real websocket, which doesn't feel right.
    const testWebSocket = new WebSocket('ws://pc0088:8080/ws');
    new MalcolmConnection(spyCallback, testWebSocket);

    it('should be an object', function() {
        // expect(typeof(testPlugin)==='object');
    });

    it('should have a connect() method', function() {
        // expect(typeof(testPlugin.connect())==='function')
    });

    it('Should call the callback passed to it with data from Malcolm', function() {
        //Not sure how to 'fake' a message from malcolm, we have come across this
        //problem before and decided not to tackle it.
        //The only thing I can think of is to somehow mock the 'onmessage' call from
        //a websocket - potentially using something like project-react's fake submission.
    });

});
