import {createStore} from 'redux';
import EPICSWebReducer from './EPICSReducer.js';
export const store = createStore(EPICSWebReducer);

