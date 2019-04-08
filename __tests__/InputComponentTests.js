import InputComponent from '../client/components/InputComponent.js';
import {BaseComponent} from '../client/components/BaseComponent.js';
import React from 'react';

import sinon from 'sinon';
import {shallow} from 'enzyme';
import {expect} from 'chai';


describe('InputComponent', () => {
    const setValueSpy = sinon.stub(BaseComponent.prototype, 'setValue');
    const shallowInput = shallow(<InputComponent />);
    shallowInput.simulate('change', {
        target: {'value': 'hello'}
    });

    it('should render an input', () => {
        expect(shallowInput.type()).to.equal('input');
        expect(shallowInput.props().type).to.equal('text');
    });

    it('should call setValue when enter pressed', () => {
        shallowInput.simulate('keyDown', {
            key: 'Enter',
            target: {
                value: 10,
                blur: () => {}
            },
        });
        expect(setValueSpy).to.have.been.calledOnce;
    });

    it('should call blur when enter pressed', () => {
        const blurSpy = sinon.spy();
        shallowInput.simulate('keyDown', {
            key: 'Escape',
            target: {
                value: 10,
                blur: blurSpy
            },
        });
        expect(blurSpy).to.have.been.calledOnce;
    });

    /* Parameterised tests. */
    const values = [['10', '10.000'], ['1', '1.000'], ['-1', '-1.000']];
    it.each('should render EPICS value in correct format', values, (input, output) => {
        shallowInput.setState({'EPICSValue': input});
        expect(shallowInput.props().value).to.equal(output);
    });

});

