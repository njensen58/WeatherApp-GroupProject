import React from 'react';

function LoginForm(props){
    return (
        <div className="loginFormContainer">
            <form onSubmit={props.handleLogin}>
                <input
                    type="text"
                    value={props.value.username}
                    onChange={props.handleChange}
                    name="username"
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={props.value.password}
                    onChange={props.handleChange}
                    name="password"
                    placeholder="Password"
                />
                <button>Login</button>
                <p>{props.errMsg}</p>
            </form>
        </div>
    )
}

export default LoginForm;
