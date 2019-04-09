import InputComponent from '../client/components/InputComponent.js';
import {BaseComponent} from '../client/components/BaseComponent.js';
import React from 'react';

import {shallow} from 'enzyme';


describe('InputComponent', () => {
    const setValueSpy = BaseComponent.prototype.setValue = jest.fn();

    let shallowInput;
    beforeEach(() => {
        shallowInput = shallow(<InputComponent />);
    });

    it('should render an input', () => {
        expect(shallowInput.type()).toEqual('input');
        expect(shallowInput.props().type).toEqual('text');
    });

    it('should call setValue when enter pressed', () => {
        shallowInput.simulate('keyDown', {
            key: 'Enter',
            target: {
                value: 10,
                blur: () => {}
            },
        });
        expect(setValueSpy).toHaveBeenCalledTimes(1);
    });

    it('should call blur when enter pressed', () => {
        const blurSpy = jest.fn();
        shallowInput.simulate('keyDown', {
            key: 'Escape',
            target: {
                value: 10,
                blur: blurSpy
            },
        });
        expect(blurSpy).toHaveBeenCalledTimes(1);
    });

    /* Parameterised tests. */
    const values = [['10', '10.000'], ['1', '1.000'], ['-1', '-1.000']];
    it.each(values)('should render EPICS value %s in correct format', (input, output) => {
        shallowInput.setState({'EPICSValue': input});
        expect(shallowInput.props().value).toEqual(output);
    });

});

