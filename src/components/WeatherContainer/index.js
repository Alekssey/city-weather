import React, { Component } from 'react';
import { connect } from 'react-redux';
import WeatherBox from '../WeatherBox/index.js';
import Choose from '../Choose/index.js';
import Loader from '../Loader/index.js';
import Error from '../Error/index.js';
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
        this.setState((prevProps) => {
            return {
                chooseDay: index
            }
        })
    };

    onRenderWeatherContainer = () => {
        const { list } = this.props.weather;
        const { city } = this.props.weather;
        const { loaded } = this.props.weather;
        const { loading } = this.props.weather;
        const { error } = this.props.weather;

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
            const index = this.state.chooseDay;
            const weatherBox = onParseWeatherData(list).map((dayWeather, key) => (
                    <li key={key}>
                        <WeatherBox dayWeather={[...dayWeather]}
                                    onChooseDay={this.onChooseDay}
                                    city={{...city}}
                        />
                    </li>
                )
            );

            return (
                <ul>
                    {weatherBox[index]}
                </ul>
            )
        }
    };

    handleClickShowWeather = () => {
        this.setState((prevState) => {
            return {
                showWeather: !prevState.showWeather
            }
        })
    };

    render() {
        return (
            <div>
                <button className='weather-button show-weather'
                        onClick={this.handleClickShowWeather}>W</button>
                <div className='weather-container'>
                    {(this.state.showWeather) ? this.onRenderWeatherContainer() : null}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        weather: state.weather
    }
}

export default connect(mapStateToProps)(Weather);