import React from 'react';
import Drawer from './Drawer';
import {connect} from 'react-redux';
import {getImage} from '../../redux/images';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class Home extends React.Component {
    constructor(){
        super();
        this.state = {
            image: ''
        }
    }

    componentDidMount(){
        this.props.getImage().then(() => {
            this.setState({
                image: this.props.images.image.image
            })
        });
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
                    <h1 style={{margin: 0, paddingLeft: '30px'}}>THIS IS THE HOME PAGE</h1>
                </div>
            </div>
        )
    }
}

export default connect(state=>state, {getImage})(Home);
