import {TextInput} from '../src/epics/TextInput.js';
import React from 'react';

import {shallow} from 'enzyme';


describe('TextInput', function() {

    it('should have a callback', function() {
        const shallowInput = shallow(<TextInput />);
        expect(shallowInput.props().setValue).toBeInstanceOf(Function);
    });

});

