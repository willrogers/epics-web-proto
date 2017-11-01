import React from 'react';


export default class DivComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(<div>The value is {this.props.EPICSValue} </div>);
    }
}
