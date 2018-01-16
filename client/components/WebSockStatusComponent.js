import React from 'react';
import {closeWebSocket, unsubscribeToPV} from '../actions/EPICSActions';


export default class WebSockStatusComponent extends React.Component {
    constructor(props){
        super(props)
    }

    readyStatusText() {
        return (
            <text x="30" y="30" fill="black">
                WebSocket readyState: {this.props.readyState}
            </text>
        );
    }

    handleClick() {
        console.log(this)
        console.log(this.id)
        unsubscribeToPV(super.id);
        closeWebSocket();
    }

    render() {
        return (
            <div>

                <svg
                    width={this.props.width}
                    height={this.props.height}>

                    {this.readyStatusText()}

                </svg>

                <button onClick={()=> this.handleClick()}>
                    Disconnect
                </button>

            </div>
        );

    }
}