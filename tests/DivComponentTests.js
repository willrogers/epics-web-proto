import DivComponent from '../client/components/DivComponent.js';
import React from 'react';

import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

import {shallow} from 'enzyme';
import {expect} from 'chai';

describe('DivComponent', function() {
    const shallowDiv = shallow(<DivComponent EPICSValue="hello"/>);

    it('Should render a div', function() {
        expect(shallowDiv.type()).to.equal('div');
    });

    it ('Should ', function() {

    });
});

