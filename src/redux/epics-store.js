import {createStore, applyMiddleware} from 'redux';
import EpicsReducer from './epics-reducer';
import websocketMiddleware from './websocket-middleware';

//Create the middleware using the redux API applyMiddleware, draws from
// the file imported above.
const middleware = applyMiddleware(websocketMiddleware);

//Export the store, which is a combination of our middleware and
//reducer.
export const store = createStore(EpicsReducer, middleware);
