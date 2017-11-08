import React from 'react';
import {store} from '../../redux/EPICSStore.js';
import {connectToServer} from '../actions/EPICSActions';



export class SuperContainer extends React.Component {

    constructor(props) {
        super(props);
        var currentId = 0;
        currentId++;
        this.state = {EPICSValue: null, PV: null};
        this.hookToStore();
    }

    componentDidMount() {
        console.log("componentDidMount in SuperContainer")
        console.log("'this' in supercontainer")
        console.log(this)
        connectToServer(this);
    }

    //Register the component to listen to the store. This triggers when
    //the store has changed.
    hookToStore() {
        store.subscribe(()=>{
            this.setState({ EPICSValue: store.getState().epicsData['pv']});
        });
    }

    render(){
        return null
    }
}
