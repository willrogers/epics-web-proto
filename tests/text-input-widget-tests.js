import {RawTextInput} from '../src/widgets/text-input-widget';
import React from 'react';

import {shallow} from 'enzyme';


describe('TextInputWidget', () => {
    const setValueSpy = jest.fn();

    let shallowInput;
    beforeEach(() => {
        shallowInput = shallow(<RawTextInput setValue={setValueSpy} />);
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

    it('should clear text when clicked', () => {
        shallowInput.simulate('click', {});
        expect(shallowInput.props().value).toEqual('');
    });

    it('should restore text on blur', () => {
        shallowInput.setProps({value: 1});
        shallowInput.simulate('blur', {});
        expect(shallowInput.props().value).toEqual('1.000');
    });

    /* Parameterised tests. */
    const values = [['10', '10.000'], ['1', '1.000'], ['-1', '-1.000']];
    it.each(values)('should render EPICS value %s in correct format', (input, output) => {
        shallowInput.setProps({'value': input});
        expect(shallowInput.props().value).toEqual(output);
    });

});

