//Import react API
import React from 'react';

//Our component
import WebSockStatusComponent from '../components/WebSockStatusComponent.js';

//Define extension
import {BaseComponent} from './BaseComponent.js';

//Redux API - allows us to subscribe to specific store changes
import {store} from '../redux/EPICSStore';

export class WebSockStatusContainer extends BaseComponent {

    //Initialise the internal state and hook the container to the store.
    constructor(props) {
        super(props);
        this.state = {readyState: null};
        this.hookToStore();
    }

    //These lifecycle methods are to override the PV based behaviours
    //that we use for all other components, normally inherited from the
    //BaseComponent.
    componentDidMount() { /* Override BaseComponent*/ }
    componentWillUnmount() { /* Override BaseComponent */ }


    //Listen for changes to the wsReadyState in the store, copy it
    //to the internal state
    hookToStore() {
        store.subscribe(()=>{
            if (typeof store.getState() !== 'undefined') {
                this.setState(
                    {readyState: store.getState().wsReadyState}
                );
            }
        });
    }

    //Define the WebSockStatusCompo, pass it the wsReadyState as props.
    render() {
        return <WebSockStatusComponent
            readyState={this.state.readyState}
            width={this.props.width}
            height={this.props.height}
        />;
    }
}