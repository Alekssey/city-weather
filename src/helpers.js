export function onParseWeatherData(list){
    let resultWeatherArray = [];
    let oneDayWeatherArray = [];

    for(let i = 0, j = 0; i < 25; i++, j++){
        if(j === 8) {
            j = 0;
            resultWeatherArray.push(oneDayWeatherArray);
            oneDayWeatherArray = [];
        }

        let weatherForCurrentHour = {
            date: list[i]['dt_txt'],
            temperature: list[i].main.temp,
            description: list[i].weather[0].description
        };

        oneDayWeatherArray.push(weatherForCurrentHour);
    }

    return resultWeatherArray;
}
