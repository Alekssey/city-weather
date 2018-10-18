import { GET_CITY_WEATHER } from "../../../AC/types";
import { takeEvery } from 'redux-saga/effects';
import { weatherRequest } from '../worker/index.js';

function* watchWeatherRequests(){
    yield takeEvery(GET_CITY_WEATHER, weatherRequest)
}

export default watchWeatherRequests;