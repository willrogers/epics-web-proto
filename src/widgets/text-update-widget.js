import React from 'react';
import PropTypes from 'prop-types';

import {widgetHoc} from './widget';

const PRECISION_NOT_SPECIFIED = -1;

const DEFAULT_STYLE = {
    'backgroundColor': 'lightgray',
    'overflow': 'hidden'
};

export class RawTextUpdate extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let formattedString = this.props.value;
        if (this.props.precision !== PRECISION_NOT_SPECIFIED) {
            const prec = parseFloat(this.props.precision);
            let val = parseFloat(this.props.value);
            formattedString = val.toFixed(prec);
        }
        return(<div style={this.props.style}>{formattedString}</div>);
    }
}

RawTextUpdate.propTypes = {
    value: PropTypes.string,
    precision: PropTypes.number,
    style: PropTypes.object
};
RawTextUpdate.defaultProps = {
    value: '',
    precision: PRECISION_NOT_SPECIFIED,
    style: {}
};

export const TextUpdateWidget = widgetHoc(RawTextUpdate, DEFAULT_STYLE);

