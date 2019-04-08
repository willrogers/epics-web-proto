/* Set up enzyme. */
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

/* Load sinon-chai. */
import chai from 'chai';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
