import React from 'react';
import PropTypes from 'prop-types';


export default class DivComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(<div>This value is {this.props.EPICSValue} </div>);
    }
}

DivComponent.propTypes = { EPICSValue: PropTypes.number };