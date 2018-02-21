import React from 'react';
import PropTypes from 'prop-types';

export default class LabelComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div class="labelDiv">
                <div> {this.props.labelText} </div>
            </div>
        );
    }
}