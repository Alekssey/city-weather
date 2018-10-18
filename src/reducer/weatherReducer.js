import { GET_CITY_WEATHER_START, GET_CITY_WEATHER_SUCCESS, GET_CITY_WEATHER_ERROR } from "../AC/types";

const defaultState = {
    loading: false,
    loaded: false,
    error: false
};

export default (state = defaultState, action) => {
    const { type, weather } = action;

    switch (type){
        case GET_CITY_WEATHER_START:
            return {...state, loading: true, loaded: false};
            break;
        case GET_CITY_WEATHER_SUCCESS:
            return {...state, loading: false, loaded: true, ...weather};
            break;
        case GET_CITY_WEATHER_ERROR:
            return {...state, error: true};
            break;
    }

    return state;
}