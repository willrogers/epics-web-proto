import React from 'react';
import {widgetHoc, RELATIVE_LAYOUT} from '../src/widgets/Widget.js';

import {shallow} from 'enzyme';


describe('widgetHoc', () => {

    const Comp = _props => {
        return <div />;
    };

    it('should convert position style if absolute', () => {
        const WidgetComp = widgetHoc(Comp);
        const shallowWidget = shallow(<WidgetComp x={1} y={1}/>);
        expect(shallowWidget.props().style.left).toEqual('1px');
        expect(shallowWidget.props().style.top).toEqual('1px');
        expect(shallowWidget.props().style.position).toEqual('absolute');
    });

    it('should not convert position style if relative', () => {
        const WidgetComp = widgetHoc(Comp, {},  RELATIVE_LAYOUT);
        const shallowWidget = shallow(<WidgetComp />);
        expect(shallowWidget.props().style.left).toBeUndefined();
        expect(shallowWidget.props().style.top).toBeUndefined();
    });

});