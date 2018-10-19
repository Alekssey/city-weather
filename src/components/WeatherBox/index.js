import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default class WeatherBox extends Component {
    static propTypes = {
        dayWeather: PropTypes.array.isRequired,
        onChooseDay: PropTypes.func.isRequired,
        city: PropTypes.object.isRequired
    };

    render(){
        const { dayWeather, city } = this.props;

        const resultWeather = dayWeather.map(({ date, temperature, description }) => {
            const tmp = Math.round(temperature - 272);

            return <li key={date}><span>{date} : <strong>{tmp}C {description}</strong></span></li>
        });

        return (
            <div className='weather-box'>
                <div className='choose-day-button'>
                    <button onClick={() => {this.props.onChooseDay(0)}} className='weather-button choose-day'>24 h</button>
                    <button onClick={() => {this.props.onChooseDay(1)}} className='weather-button choose-day'>48 h</button>
                    <button onClick={() => {this.props.onChooseDay(2)}} className='weather-button choose-day'>72 h</button>
                </div>
                <ul>
                    {resultWeather}
                    <li key={city.name}>
                        <span>
                            city : <strong>{(city.name) ? city.name : 'unknown city'}</strong>
                        </span>
                    </li>
                    <li key={city.country}>
                        <span>
                            country : <strong>{(city.country) ? city.country : 'unknown country'}</strong>
                        </span>
                    </li>
                </ul>
            </div>
        )
    }
}