import {createStore, applyMiddleware} from 'redux';
import EPICSReducer from './EPICSReducer.js';
import {websockMiddleware} from './WebsockMiddleware.js';

const middleware = applyMiddleware(websockMiddleware);

export const store = createStore(EPICSReducer, middleware);
