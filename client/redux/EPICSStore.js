//Redux API
import {createStore, applyMiddleware} from 'redux';

//Import our reducer.
import EPICSReducer from './EPICSReducer.js';

//Import our middleware from definition.
import websockMiddleware from './WebsockMiddleware.js';

//Create the middleware using the redux API applyMiddleware, draws from
// the file imported above.
const middleware = applyMiddleware(websockMiddleware);

//Export the store, which is a combination of our middleware and
//reducer.
export const store = createStore(middleware, EPICSReducer);
