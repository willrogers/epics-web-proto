import React from 'react';
import PropTypes from 'prop-types';

export class LabelComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <span
                    style={{background:'#D3D3D3', outline:'2px solid black', offset:'10px'}}>
                    {this.props.PV} : {'\n'}
                </span>
            </div>
        );
    }
}

LabelComponent.propTypes = {
    PV: PropTypes.string
};