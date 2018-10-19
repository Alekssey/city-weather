import { call, put } from 'redux-saga/effects';
import { weatherApiRequest } from './helpers.js';
import { GET_CITY_WEATHER_SUCCESS, GET_CITY_WEATHER_START, GET_CITY_WEATHER_ERROR } from "../../../action/types";


export function* weatherRequest(action) {
    try {
        const { latitude, longitude, id } = action.payload;

        yield put({type: GET_CITY_WEATHER_START});

        const cityWeather = yield call(
            weatherApiRequest,
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${id}`
        );

        yield put({type: GET_CITY_WEATHER_SUCCESS, weather: cityWeather});
    } catch (error) {
        yield put({type: GET_CITY_WEATHER_ERROR});
    }
}
