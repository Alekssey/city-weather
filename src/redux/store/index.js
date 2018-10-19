import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducer/index.js';
import createSagaMiddleware from 'redux-saga';
import watchCityWeather from '../middleware/saga/watcher/watchCityWeather.js';

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);
const store = createStore(reducer, {}, middleware);

export default store;

/** It's just for dev */
window.store = store;

sagaMiddleware.run(watchCityWeather);