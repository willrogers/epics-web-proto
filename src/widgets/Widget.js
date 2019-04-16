import React from 'react';
import PropTypes from 'prop-types';


export function widgetHoc(Widget) {

    // eslint-disable-next-line react/display-name
    return class extends React.Component {

        constructor(props) {
            super(props);
            this.styles = {
                position: 'absolute',
                left: this.props.x,
                top: this.props.y
            };
        }
        render() {
            return <Widget styles={this.styles} />;
        }
    };

}

export class Widget extends React.Component {

    constructor(props) {
        super(props);
        this.styles = {
            position: 'absolute',
            left: this.props.x,
            top: this.props.y
        };
    }

}


//Prop checking
Widget.propTypes = {
    property: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    pv: PropTypes.string
};