import React from 'react';
import PropTypes from 'prop-types';


export function widgetHoc(Widget) {

    class WrappedWidget extends React.Component {

        constructor(props) {
            super(props);
            this.new_props = {};
            Object.assign(this.new_props, props);
            const styles = {
                position: 'absolute',
                left: this.props.x + 'px',
                top: this.props.y + 'px'
            };
            this.new_props['styles'] =  styles;
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

