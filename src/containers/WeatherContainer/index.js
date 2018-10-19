import React, { Component } from 'react';
import { connect } from 'react-redux';
import WeatherBox from '../../components/WeatherBox/index.js';
import Choose from '../../components/Choose/index.js';
import Loader from '../../components/Loader/index.js';
import Error from '../../components/Error/index.js';
import { onParseWeatherData } from "../../helpers";
import PropTypes from 'prop-types';
import './index.css';

class Weather extends Component {
    state = {
        showWeather: false,
        chooseDay: 0
    };

    static propTypes = {
        weather: PropTypes.object
    };

    onChooseDay = (index) => {
        this.setState({ chooseDay: index })
    };

    onRenderWeatherContainer = () => {
        const { list, city, loaded, loading, error } = this.props.weather;

        if(error){
            return <Error />
        }

        if(!loaded && !loading){
            return <Choose />
        }

        if(loading){
            return <Loader />
        }

        if(loaded){
            const { chooseDay } = this.state;
            const weatherBox = onParseWeatherData(list).map((dayWeather) => (
                    <li key={dayWeather[0].date}> <WeatherBox dayWeather={[...dayWeather]}
                                               onChooseDay={this.onChooseDay}
                                               city={{...city}}/> </li>
                )
            );

            return <ul> {weatherBox[chooseDay]} </ul>
        }
    };

    handleClickShowWeather = () => {
        this.setState((prevState) => ({ showWeather: !prevState.showWeather }))
    };

    render() {
        return (
            <div>
                <button className='weather-button show-weather'
                        onClick={this.handleClickShowWeather}>W</button>
                <div className='weather-container'>
                    {(this.state.showWeather) && this.onRenderWeatherContainer()}
                </div>
            </div>
        )
    }
}

export default connect(state => ({ weather: state.weather }))(Weather);