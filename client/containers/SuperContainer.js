import React from 'react';

import {subscribeToPV} from '../actions/EPICSActions.js';
import {store} from '../../redux/EPICSStore.js'

var currentId = 0;

export class SuperContainer extends React.Component{

    constructor(props){
        super(props)
        currentId++;
        this.state = {EPICSValue: null, PV: null};
        this.hookToStore();
    }

    componentDidMount(){
        subscribeToPV(this.state.PV, currentId)
    }

    returnId(){
        return currentId;
    }

    hookToStore(){ 
        store.subscribe(()=>{
            this.setState(store.getState());
        })
    }

}