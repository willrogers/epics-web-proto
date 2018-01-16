import React from 'react';
import WebSockStatusComponent from '../components/WebSockStatusComponent.js';
// import {SuperContainer} from './SuperContainer.js'
// import {store} from "../../redux/EPICSStore";

export class WebSockStatusContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {WebsocketStatus: null}
    }


    // This needs to listen to the store (currently does through supercontainer)
    // and update on WebSocket readyState change.

    hookToStore() {
        store.subscribe(()=>{
            if (typeof store.getState() !== 'undefined') {
                this.setState(
                    {WebsocketStatus: store.getState().connectionObject.readyState}
                );
            }
        });
    }

    render() {
        return <WebSockStatusComponent
                    WebSockStatus={this.state.WebsocketStatus}
                    width={this.props.width}
                    height={this.props.height}
               />
    }
}