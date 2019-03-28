//React API
import React from 'react';
import PropTypes from 'prop-types';

export default class DivComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    //Render a div that displays the desired information in text format
    render() {
        return(<div> The {this.props.PV} value is {this.props.EPICSValue} </div>);
    }
}

//We expect EPICSValues to be numbers, PVs to be strings
DivComponent.propTypes = {
    EPICSValue: PropTypes.string,
    PV: PropTypes.string
};
