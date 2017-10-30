import {DivComponent} from '../DivComponent.js';

import React from 'react';


import {shallow} from 'enzyme';
import expect from 'chai';

describe('DivComponent', function(){
    var ShallowDiv = shallow(<DivComponent/>);
    it('Should render a div', function(){
        expect(ShallowDiv.type()).to.equal('div');
    });
});