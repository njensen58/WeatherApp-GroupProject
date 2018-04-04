import React from 'react';
import {connect} from 'react-redux';
import {getImage} from '../../../redux/images';
import {getWeather} from '../../../redux/weather';
const Rain = require('../../../resources/weatherIcons/Cloud-Drizzle.svg');
const ClearDay = require('../../../resources/weatherIcons/Sun.svg');
const ClearNight = require('../../../resources/weatherIcons/Moon-Waning-Crescent.svg');
const Snow = require('../../../resources/weatherIcons/Cloud-Snow-Alt.svg');
const Sleet = require('../../../resources/weatherIcons/Cloud-Snow.svg');
const Wind = require('../../../resources/weatherIcons/Wind.svg');
const Fog = require('../../../resources/weatherIcons/Cloud-Fog.svg');
const Cloudy = require('../../../resources/weatherIcons/Cloud.svg');
const PartlyCloudy = require('../../../resources/weatherIcons/Cloud-Sun.svg');
const PartlyCloudyDay = require('../../../resources/weatherIcons/Cloud-Sun.svg');
const PartlyCloudyNight = require('../../../resources/weatherIcons/Cloud-Moon.svg');
const Tornado = require('../../../resources/weatherIcons/Tornado.svg');
const Hail = require('../../../resources/weatherIcons/Cloud-Hail.svg');
const Thunderstorm = require('../../../resources/weatherIcons/Cloud-Lightning.svg');
const LightRain = require('../../../resources/weatherIcons/Cloud-Drizzle-Sun.svg');

class WeatherDisplay extends React.Component {
    constructor(){
        super();
        this.state = {
            weatherData: {},
            city: '',
            icon: ClearDay
        }
        this.getIcon = this.getIcon.bind(this);
        this.clearInputs = this.clearInputs.bind(this)
    }

    clearInputs(){
        this.setState({
            city: ''
        })
    }

    getIcon() {
        switch(this.props.current.icon){
            case 'rain':
                return Rain;
            case 'clear-day':
                return ClearDay;
            case 'clear-night':
                return ClearNight;
            case 'snow':
                return Snow;
            case 'sleet':
                return Sleet;
            case 'wind':
                return Wind;
            case 'fog':
                return Fog;
            case 'cloudy':
                return Cloudy;
            case 'partly-cloudy':
                return PartlyCloudy;
            case 'partly-cloudy-day':
                return PartlyCloudyDay;
            case 'partly-cloudy-night':
                return PartlyCloudyNight;
            case 'tornado':
                return Tornado;
            case 'hail':
                return Hail;
            case 'thunderstorm':
                return Thunderstorm;
            case 'light-rain':
                return LightRain;
            default:
                return ClearDay
            }
    }

    render(){
        const icon = this.getIcon()
        return (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <input type="text" name="city" value={this.props.city} onChange={this.props.handleChange} placeholder="Enter City" style={{marginLeft: '40px'}}/>
                    <button onClick={this.clearInputs}>submit</button>
                </form>
                <div>
                    <h1 style={{margin: 0, paddingLeft: '30px'}}>{this.props.current.summary}</h1>
                    <img src={icon} alt=""/>
                </div>
            </div>
        )
    }
}

export default connect(state=>state, {getImage, getWeather})(WeatherDisplay);
