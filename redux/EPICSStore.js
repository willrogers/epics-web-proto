import {createStore, applyMiddleware} from 'redux';
import EPICSReducer from './EPICSReducer.js';
import websockMiddleware from './WebsockMiddleware,js';

export const middleware = applyMiddleware(websockMiddlware);

export const store = createStore(EPICSReducer, middleware);

