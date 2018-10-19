import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/action/index.js';
import ReactMapGL, {NavigationControl} from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import Weather from './WeatherContainer/index.js';
import PropTypes from 'prop-types';
import "mapbox-gl/dist/mapbox-gl.css";

/** Guys, please, don't use my mapbox token :)
 *  https://www.mapbox.com/help/how-access-tokens-work/#rotating-tokens - here You can get info about how get your own token */
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWxla3NleXRpbW9zY2hlbmtvIiwiYSI6ImNqbjh3Y2Q1azZzZW4zcHFjeXJsYnZ1MWYifQ.1QKeCXy-l6KVJFb9w4eNKg';

class Map extends Component {
    constructor(props){
        super(props);

        this.state = {
            viewport: {
                width: 400,
                height: 400,
                latitude: 27.56,
                longitude: 	53.9,
                zoom: 1
            },
            isWeatherBoxOpen: false
        };
        this.mapRef = React.createRef();
    }

    static propTypes = {
        getCityWeather: PropTypes.func.isRequired
    };

    componentDidMount() {
        window.addEventListener('resize', this.resize);
        this.resize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => {
        this.onViewportChange({
            width: window.innerWidth,
            height: window.innerHeight
        });
    };

    onViewportChange = viewport => {
        this.setState({
            viewport: { ...this.state.viewport, ...viewport }
        });
    };

    onTransitionEnd = () => {
        const { getCityWeather } = this.props;

        const cityLatitude = this.state.viewport.latitude;
        const cityLongitude = this.state.viewport.longitude;

        getCityWeather(cityLatitude, cityLongitude);
    };

    render() {
        const {viewport} = this.state;

        return (
            <ReactMapGL
                ref={this.mapRef}
                {...viewport}
                onViewportChange={this.onViewportChange}
                onTransitionEnd={this.onTransitionEnd}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            >
                <Weather />
                <div style={{position: 'absolute', right: 10, top: 60}}>
                    <NavigationControl onViewportChange={this.onViewportChange}
                                       showCompass={false}
                    />
                </div>
                    <Geocoder mapRef={this.mapRef}
                              onViewportChange={this.onViewportChange}
                              mapboxApiAccessToken={MAPBOX_TOKEN}
                    />
            </ReactMapGL>
        );
    }
}

export default connect(null, actions)(Map);