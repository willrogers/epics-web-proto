import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({adapter: new Adapter()});
import EPICSReducer from '../client/redux/EPICSReducer';
import {
    UPDATE_PV
} from '../client/actions/EPICSActions.js';
import {expect} from 'chai';


describe('EPICSReducer', () => {

    it('can set and return an initial state', () => {
        expect(EPICSReducer(undefined, {})).to.deep.equal(
            {epicsData: {}, wsReadyState: null}
        );
    });

    it('can update the state with an input', () => {
        const action = {
            type: UPDATE_PV,
            payload: {
                pvName: 'testPVName',
                pvValue: 123456
            }
        };
        expect(EPICSReducer([], action)).to.deep.equal({
            epicsData: {
                testPVName: 123456
            }

        });
    });

});