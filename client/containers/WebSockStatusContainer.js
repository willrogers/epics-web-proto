import React from 'react';
import WebSocketStatusComponent from '../components/WebSocketStatusComponent.js'

export class WebSockStatusContainer extends SuperContainer {
    constructor(props) {
        super(props);
    }

    render() {
        return <WebSockStatusComponent
                    WebSockStatus={this.state.sockStat}
                    width={this.props.width}
                    height={this.props.height}
               />
    }
}