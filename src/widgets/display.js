//React API
import React from 'react';
import PropTypes from 'prop-types';

export class Display extends React.Component {

    constructor(props) {
        super(props);
        this.factory = this.props.factory;
    }

    render() {
        const style = {'border': '1px solid black', 'height': this.props.h + 'px', 'width': this.props.w + 'px'};
        return (
            <div style={style}>
                {this.props.children.map((child, key) => this.factory(child, key))}
            </div>
        );
    }
}

//We expect EPICSValues to be numbers, PVs to be strings
Display.propTypes = {
    factory: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.object)
};
