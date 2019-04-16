import React from 'react';
import PropTypes from 'prop-types';


export function widgetHoc(Widget) {

    class WrappedWidget extends React.Component {

        constructor(props) {
            super(props);
            this.new_props = {};
            Object.assign(this.new_props, props);
            this.new_props['position'] = 'absolute';
            this.new_props['left'] = this.props.x;
            this.new_props['top'] = this.props.y;
        }
        render() {
            return <Widget {...this.new_props} />;
        }
    }

    WrappedWidget.propTypes = {
        property: PropTypes.string,
        x: PropTypes.number,
        y: PropTypes.number,
        pv: PropTypes.string
    };

    return WrappedWidget;

}

