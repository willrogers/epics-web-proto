import TextUpdate from '../src/widgets/TextUpdate.js';
import React from 'react';

import {shallow} from 'enzyme';


describe('TextUpdate', function() {

    it('Should render a div', function() {
        const shallowUpdate = shallow(<TextUpdate />);
        expect(shallowUpdate.type()).toEqual('div');
    });

    it('Should render text', function() {
        const text = 'dummy';
        const  shallowUpdate = shallow(<TextUpdate value={text} />);
        expect(shallowUpdate.text()).toEqual(text);
    });

    it('Should render a number to 3d.p.', function() {
        const number = '3.2';
        const formattedNumber = '3.200';
        const  shallowUpdate = shallow(<TextUpdate value={number} precision={3} />);
        expect(shallowUpdate.text()).toEqual(formattedNumber);
    });

});

