import TextUpdate from '../src/widgets/TextUpdate.js';
import React from 'react';

import {shallow} from 'enzyme';


describe('TextUpdate', function() {
    const shallowDiv = shallow(<TextUpdate />);

    it('Should render a div', function() {
        expect(shallowDiv.type()).toEqual('div');
    });

});

