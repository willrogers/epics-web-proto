//React API
import React from 'react';
import PropTypes from 'prop-types';

import {widgetHoc} from './Widget.js';

const PRECISION_NOT_SPECIFIED = -1;

export class RawTextUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.props.styles['width'] = 100;
        this.props.styles['backgroundColor'] = 'lightgray';
        this.props.styles['overflow'] = 'hidden';
    }

    //Render a div that displays the desired information in text format
    render() {
        let formattedString = this.props.value;
        if (this.props.precision != PRECISION_NOT_SPECIFIED) {
            const prec = parseFloat(this.props.precision);
            let val = parseFloat(this.props.value);
            formattedString = val.toFixed(prec);
        }
        return(<div style={this.props.styles}>{formattedString}</div>);
    }
}

RawTextUpdate.propTypes = {
    value: PropTypes.string,
    precision: PropTypes.number,
    styles: PropTypes.object
};
RawTextUpdate.defaultProps = {
    value: '',
    precision: PRECISION_NOT_SPECIFIED,
    styles: {}
};

export const TextUpdateWidget = widgetHoc(RawTextUpdate);

