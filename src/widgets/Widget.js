import React from 'react';
import PropTypes from 'prop-types';

import assign from 'lodash/assign';


export function widgetHoc(Widget, defaultStyles) {

    class WrappedWidget extends React.Component {

        constructor(props) {
            super(props);
            this.defaultStyles = defaultStyles;
            this.updateStyle = this.updateStyle.bind(this);
            this.widgetStyles = {
                position: 'absolute',
                left: this.props.x + 'px',
                top: this.props.y + 'px',
                height: this.props.h + 'px',
                width: this.props.w + 'px'
            };
            this.styles = {};
        }

        updateStyle() {
            assign(this.styles, this.defaultStyles);
            assign(this.styles, this.props.styles);
            assign(this.styles, this.widgetStyles);
        }

        render() {
            this.updateStyle();
            return <Widget styles={this.styles} {...this.props} />;
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

