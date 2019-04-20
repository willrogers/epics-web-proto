import {RawLabel} from '../src/widgets/label';
import React from 'react';

import {shallow} from 'enzyme';


describe('RawLabel', function() {

    it('Should render a div', function() {
        const shallowUpdate = shallow(<RawLabel />);
        expect(shallowUpdate.type()).toEqual('div');
    });

    it('Should render text', function() {
        const text = 'dummy';
        const  shallowUpdate = shallow(<RawLabel label={text} />);
        expect(shallowUpdate.text()).toEqual(text);
    });

});

