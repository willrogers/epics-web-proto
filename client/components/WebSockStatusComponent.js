import React from 'react';

export default class WebSockStatusComponent extends React.Component {
    constructor(props){
        super(props)
    }
    //
    // readyStatusText() {
    //     return(
    //         <g>
    //
    //         </g>
    // }
    // {this.readyStatusText()}

    render() {
        return (
            <svg width={this.props.width} height={this.props.height}>

            </svg>
        );

    }
}