import React from 'react';

import {subscribeToPV, receivePVUpdate} from '../actions/EPICSActions.js';
import {store} from '../../redux/EPICSStore.js';

var currentId = 0;

export class SuperContainer extends React.Component{

    constructor(props){
        super(props);
        currentId++;
        this.state = {EPICSValue: null, PV: null};
        this.hookToStore();
    }

    componentDidMount(){
        subscribeToPV(this.state.PV, currentId);
        /* send off an action to avoid having to set up the EPICS connection */
        receivePVUpdate(100);
    }

    returnId(){
        return currentId;
    }

    hookToStore(){
        store.subscribe(()=>{
            this.setState({ EPICSValue: store.getState().epicsData['pv']});
        });
    }

}
