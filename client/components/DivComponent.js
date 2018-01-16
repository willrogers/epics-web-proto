import React from 'react';
import PropTypes from 'prop-types';

export default class DivComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(<div> The {this.props.PV} value is {this.props.EPICSValue} </div>);
    }
}

//We expect the DivComponent's props to the be numbers
DivComponent.propTypes = { EPICSValue: PropTypes.number };
