import React from 'react';
import PropTypes from 'prop-types';

import assign from 'lodash/assign';


export function widgetHoc(Widget, defaultStyle) {

    class WrappedWidget extends React.Component {

        constructor(props) {
            super(props);
            this.defaultStyle = defaultStyle;
            this.updateStyle = this.updateStyle.bind(this);
            this.widgetStyle = {
                position: 'absolute',
                left: this.props.x + 'px',
                top: this.props.y + 'px',
                height: this.props.h + 'px',
                width: this.props.w + 'px'
            };
            this.style = {};
        }

        updateStyle() {
            assign(this.style, this.defaultStyle);
            assign(this.style, this.props.style);
            assign(this.style, this.widgetStyle);
        }

        render() {
            this.updateStyle();
            return <Widget style={this.style} {...this.props} />;
        }
    }

    WrappedWidget.propTypes = {
        property: PropTypes.string,
        x: PropTypes.number,
        y: PropTypes.number,
        h: PropTypes.number,
        w: PropTypes.number,
        pv: PropTypes.string
    };

    return WrappedWidget;

}

