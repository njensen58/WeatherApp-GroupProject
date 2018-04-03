import React from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {signup, login} from '../../redux/auth';
import './authStyles.css';



class AuthFormContainer extends React.Component {
    constructor(){
        super();
        this.state = {
            loginToggle: false,
            user: {
                username: '',
                password: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(e){
        let name = e.target.name;
        let value = e.target.value;
        this.setState(prevState => {
            return {
                user: {
                    ...prevState.user,
                    [name]: value
                }
            }
        });
    }


    handleSubmit(e){
        e.preventDefault();
        if(this.state.user.username && this.state.user.password){
            this.props.signup(this.state.user);
            if(this.props.user.isAuthenticated){
                this.clearInputs();
                this.props.history.push('/')
            }
        }
    }


    handleLogin(e){
        e.preventDefault();
        if(this.state.user.username && this.state.user.password){
            this.props.login(this.state.user).then(() => {
            if(this.props.user.isAuthenticated){
                this.clearInputs();
                {this.props.history.push('/')}
            }
        })
        }
    }


    clearInputs(){
        this.setState({
            user: {
                username: '',
                password: ''
            }
        })
    }


    handleToggle(){
        this.setState(prevState => ({
            loginToggle: !prevState.loginToggle ? true : false
        }))
    }



    render(){
        const selected = {
            backgroundColor: '#6288a5',
            color: 'white'
        }

        let authErrCode = this.props.user.authErrCode.signup;
        let errMsg = '';
        if (authErrCode < 500 && authErrCode > 399){
            errMsg = "Invalid username or password!";
        } else if (authErrCode > 499){
            errMsg = "Server Error!";
        }

        return (
            <div className="authContainer">
                <div>
                    <button onClick={()=>this.props.history.push('/')}>Back</button>
                </div>
                <div className="authTitleContainer">
                { !this.state.loginToggle ?
                    <div>
                        <h3 style={selected} className="authLeft">Sign Up</h3>
                        <h3 onClick={this.handleToggle} className="authRight">Login</h3>
                    </div>
                :
                    <div>
                        <h3 onClick={this.handleToggle} className="authLeft">Sign Up</h3>
                        <h3 style={selected} className="authRight">Login</h3>
                    </div>
                }
                </div>

                { !this.state.loginToggle ?
                    <SignupForm
                        value={this.state.user}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        errMsg={errMsg}
                    />
                :
                    <LoginForm
                        value={this.state.user}
                        handleChange={this.handleChange}
                        handleLogin={this.handleLogin}
                    />
                }
            </div>
        )
    }
}


export default connect(state=>state, {signup, login})(AuthFormContainer);
