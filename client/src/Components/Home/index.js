import React from 'react';
import Drawer from './Drawer';
import {connect} from 'react-redux';
import {getImage} from '../../redux/images';
import {getWeather} from '../../redux/weather';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import WeatherDisplay from './WeatherDisplay';



class Home extends React.Component {
    constructor(){
        super();
        this.state = {
            image: '',
            city: '',
            icon: '',
            weatherData: {
                currently: {
                    summary: '',
                    temperature: '',
                    icon: ''
                }
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.props.getImage().then(() => {
            this.setState({
                image: this.props.images.image.image
            })
        });

        this.props.getWeather().then(() => {
            this.setState({
                weatherData: {currently: this.props.weather.currently}
            })
        })
    }

    handleChange(e){
        this.setState({
            city: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.getImage(this.state.city).then(()=> {
            this.setState({
                image: this.props.images.image.image
            })
        })
        this.props.getWeather(this.state.city).then(() => {
            this.setState({
                weatherData: {currently: this.props.weather.currently}
            })
        })
    }


    render(){
        const imageContainer = {
            backgroundImage: `url(${this.state.image})`,
            width: '400px',
            height: '400px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <Drawer />
                </MuiThemeProvider>
                <div style={imageContainer}>

                </div>
                <div>
                    <WeatherDisplay
                        imageStyle={imageContainer}
                        current={this.state.weatherData.currently}
                        city={this.state.city}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                    />
                </div>
            </div>
        )
    }
}

export default connect(state=>state, {getImage, getWeather})(Home);
