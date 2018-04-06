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
const FarDeg = require('../../../resources/weatherIcons/Degrees-Fahrenheit.svg');

class WeatherDisplay extends React.Component {
    constructor(){
        super();
        this.state = {

        }
        this.getIcon = this.getIcon.bind(this);

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
        const icon = this.getIcon();

        const inputStyle = {
            width: '80%',
            padding: '15px 0',
            textAlign: 'center',
            borderTopLeftRadius: '5px',
            border: 'none',
        }

        const btnStyle = {
            width: '20%',
            padding: '15px 0',
            borderTopRightRadius: '5px',
            marginBottom: '20%'
        }

        return (
            <div className="displayContainer" style={{width: '100%', margin: '0 5px'}}>
                <form onSubmit={this.props.handleSubmit} className="searchForm">
                    <div style={{width: '100%'}}>
                        <input type="text" name="city" value={this.props.city} onChange={this.props.handleChange} placeholder="Enter City" style={inputStyle}/>
                        <button style={btnStyle}>submit</button>
                    </div>
                </form>
                <div>
                    <h3 style={{margin: 0, paddingLeft: '10%', display: 'inline-block', fontSize: '27px'}}>{this.props.currentCity}</h3> <img src={icon} alt={this.props.current.icon}/>
                    <h1 style={{margin: 0, paddingLeft: '10%', fontWeight: '400'}}>{this.props.current.summary}</h1>
                    <h2 style={{margin: 0, paddingLeft: '10%', display: 'inline-block', fontSize: '30px', fontWeight: '400'}}>{this.props.current.temperature}</h2>
                    <span style={{fontSize: '35px'}}>˚</span><span style={{fontSize: '30px', fontWeight: '500'}}>f</span>
                </div>
            </div>
        )
    }
}

export default connect(state=>state, {getImage, getWeather})(WeatherDisplay);
