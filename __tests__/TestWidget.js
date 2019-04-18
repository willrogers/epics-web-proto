import React from 'react';
import {widgetHoc} from '../src/widgets/Widget.js';

import {shallow} from 'enzyme';


describe('widgetHoc', () => {

    const Comp = _props => {
        return <div />;
    };

    it('should convert position style', () => {
        const WidgetComp = widgetHoc(Comp);
        const shallowWidget = shallow(<WidgetComp x={1} y={1}/>);
        expect(shallowWidget.props().style.left).toEqual('1px');
        expect(shallowWidget.props().style.top).toEqual('1px');
        expect(shallowWidget.props().style.position).toEqual('absolute');
    });

});