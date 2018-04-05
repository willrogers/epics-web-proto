// import * as enzyme from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// enzyme.configure({ adapter: new Adapter() });
// import EPICSReducer from '../client/redux/EPICSReducer';
// import {
//     UPDATE_PV,
//     UPDATE_WS_READYSTATE,
// } from '../client/actions/EPICSActions.js';
// import {expect} from 'chai';
//
//
// describe('EPICSReducer', () => {
//
//     it('can set and return an initial state', ()=> {
//         expect(EPICSReducer(undefined, {})).to.equal(
//             { epicsData: {}, wsReadyState: null }
//         );
//     });
//
//     it('can update the state with an input', ()=> {
//         let blob = 'thisPV'
//         const state = {
//             EPICSValue: 0,
//             PV: blob
//         };
//         expect(
//             EPICSReducer(state, {
//                 type: UPDATE_PV,
//                 payload: {
//                     pvName: blob,
//                     pvValue: 123456
//                 }
//             })
//         ).to.equal( Object({EPICSValue: 123456, PV: 'thisPV'}));
//     });
// });