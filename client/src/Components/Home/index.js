import React from 'react';
import Drawer from './Drawer';
import Paper from 'material-ui/Paper';
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
            currentCity: 'New York City',
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
        this.props.getImage('new york city').then(() => {
            this.setState({
                image: this.props.images.image.image
            })
        });

        this.props.getWeather('new york city').then(() => {
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
                image: this.props.images.image.image,
                currentCity: this.state.city
            })
        })
        this.props.getWeather(this.state.city).then(() => {
            this.setState({
                weatherData: {currently: this.props.weather.currently},
                city: ''
            })
        })
    }


    render(){
        const imageContainer = {
            backgroundImage: `url(${this.state.image})`,
            width: '100%',
            height: '100vh',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            padding: '25px 25px 25px 50px'
        }

        const paperStyle = {
            backgroundColor: '#fff9',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '90vh',
            borderRadius: '5px'
        }

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <Drawer />
                </MuiThemeProvider>
                <div style={imageContainer}>
                    <MuiThemeProvider>
                        <Paper zDepth={2} style={paperStyle}>
                            <WeatherDisplay
                                imageStyle={imageContainer}
                                current={this.state.weatherData.currently}
                                city={this.state.city}
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}
                                currentCity={this.state.currentCity}
                            />
                        </Paper>
                    </MuiThemeProvider>
                </div>
            </div>
        )
    }
}

export default connect(state=>state, {getImage, getWeather})(Home);
