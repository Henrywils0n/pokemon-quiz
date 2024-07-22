/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';

import reducer from 'src/redux/reducers';
import ajax from './ajax';

const middleware = applyMiddleware(ajax);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(middleware);

const store = createStore(reducer, enhancers);

export default store;
