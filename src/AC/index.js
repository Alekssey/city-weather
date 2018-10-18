import { GET_CITY_WEATHER } from './types.js';

export function getCityWeather(latitude, longitude){
    return {
        type: GET_CITY_WEATHER,
        payload: {
            latitude,
            longitude,
            id: 'd76144444bfb6103f09bcc83ac4d7cc8'
        }
    }
}

