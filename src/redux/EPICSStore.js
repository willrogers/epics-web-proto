//Redux API
import {createStore, applyMiddleware} from 'redux';

//Import our reducer.
import EPICSReducer from './EPICSReducer.js';

//Import our middleware from definition.
import websocketMiddleware from './WebsocketMiddleware.js';

//Create the middleware using the redux API applyMiddleware, draws from
// the file imported above.
const middleware = applyMiddleware(websocketMiddleware);

//Export the store, which is a combination of our middleware and
//reducer.
export const store = createStore(EPICSReducer, middleware);
