import Label from '../src/widgets/Label.js';
import React from 'react';

import {shallow} from 'enzyme';


describe('TextUpdate', function() {

    it('Should render a div', function() {
        const shallowUpdate = shallow(<Label />);
        expect(shallowUpdate.type()).toEqual('div');
    });

    it('Should render text', function() {
        const text = 'dummy';
        const  shallowUpdate = shallow(<Label label={text} />);
        expect(shallowUpdate.text()).toEqual(text);
    });

});

