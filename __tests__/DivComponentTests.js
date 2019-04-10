import DivComponent from '../client/components/DivComponent.js';
import React from 'react';

import {shallow} from 'enzyme';


describe('DivComponent', function() {
    const shallowDiv = shallow(<DivComponent />);

    it('Should render a div', function() {
        expect(shallowDiv.type()).toEqual('div');
    });

});

