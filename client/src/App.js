import React from 'react';
import AuthFormContainer from './Components/Authorize';
import Home from './Components/Home';
import Profile from './Components/Profile'
import {Switch, Route} from 'react-router-dom';

function App(){
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={AuthFormContainer}/>
                <Route path="/profile" component={Profile}/>
            </Switch>
        </div>
    )
}

export default App;
