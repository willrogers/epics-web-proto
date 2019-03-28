//React API
import React from 'react';
import PropTypes from 'prop-types';

export default class LabelComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    //Render a div that displays the desired information in text format
    render() {
        let styles = {
            width: 100,
            backgroundColor: 'lightgray',
            position: 'absolute',
            left: this.props.x,
            top: this.props.y,
            whiteSpace: 'nowrap',
            overflow: 'hidden'
        };
        return(<div style={styles}>{this.props.label}</div>);
    }
}

//We expect EPICSValues to be numbers, PVs to be strings
LabelComponent.propTypes = {
    label: PropTypes.string
};
