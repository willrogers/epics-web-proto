import DivComponent from '../client/components/DivComponent.js';
/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-disable no-unused-vars*/

import {shallow} from 'enzyme';
import {expect} from 'chai';

describe('DivComponent', function() {
    var shallowDiv = shallow(<DivComponent EPICSValue="hello"/>);

    it('Should render a div', function() {
        expect(shallowDiv.type()).to.equal('div');
    });
});

