import React from 'react';

export default class WebSockStatusComponent extends React.Component {
    constructor(props){
        super(props)
    }

    readyStatusText() {
        return(
            <text x="30" y="30" fill="black">
                WebSocket readyState: {this.props.readyState}
            </text>
        );
    }

    render() {
        return (
            <svg width={this.props.width} height={this.props.height}>
                {this.readyStatusText()}
            </svg>
        );

    }
}