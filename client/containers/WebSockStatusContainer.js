import React from 'react';
import WebSockStatusComponent from '../components/WebSockStatusComponent.js';
import {SuperContainer} from './SuperContainer.js'
import {store} from "../../redux/EPICSStore";

export class WebSockStatusContainer extends SuperContainer{
    constructor(props) {
        super(props);
        this.state = {readyState: null};
        this.hookToStore();
    }

    componentDidMount() {/*Override super*/}

    componentWillUnmount() {/*Override super*/}

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
                    readyState={this.state.readyState}
                    width={this.props.width}
                    height={this.props.height}
               />
    }
}