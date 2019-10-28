/* eslint-disable import/no-extraneous-dependencies */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

export default (state = {}, mocks = {}) => configureStore([thunk.withExtraArgument({ ...mocks })])(state);
