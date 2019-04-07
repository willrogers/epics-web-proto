import DivComponent from '../client/components/DivComponent.js';
import React from 'react';

import {shallow} from 'enzyme';
import {expect} from 'chai';

describe('DivComponent', function() {
    const shallowDiv = shallow(<DivComponent EPICSValue="hello"/>);

    it('Should render a div', function() {
        expect(shallowDiv.type()).to.equal('div');
    });

});

