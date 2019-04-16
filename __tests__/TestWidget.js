import React from 'react';
import {widgetHoc} from '../src/widgets/Widget.js';

import {shallow} from 'enzyme';


describe('widgetHoc', () => {

    const Comp = _props => {
        return <div />;
    };

    it('should convert position styles', () => {
        const WidgetComp = widgetHoc(Comp);
        const shallowWidget = shallow(<WidgetComp x={1} y={1}/>);
        expect(shallowWidget.props().left).toEqual(1);
        expect(shallowWidget.props().top).toEqual(1);
        expect(shallowWidget.props().position).toEqual('absolute');
    });

});