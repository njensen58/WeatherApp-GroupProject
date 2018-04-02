import React from 'react';
import Drawer from './Drawer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

function Home(props){
    return (
        <div>
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <Drawer />
            </MuiThemeProvider>

            <div>
                <h1 style={{margin: 0, paddingLeft: '30px'}}>THIS IS THE HOME PAGE</h1>
            </div>
        </div>
    )
}

export default Home;
