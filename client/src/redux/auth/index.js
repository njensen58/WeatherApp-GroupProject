import axios from 'axios';
let authAxios = axios.create();

authAxios.interceptors.request.use(config => {
    const token = localStorage.token;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const initialState = {
    user: {
        username: '',
        password: '',
        _id: ''
    },
    authErrCode: {
        signup: '',
        signin: ''
    },
    isAuthenticated: false,
}



export function signup(userInfo){
    return dispatch => {
        authAxios.post('/auth/signup', userInfo)
            .then(response => {
                const {token, user} = response.data;
                localStorage.token = token;
                localStorage.user = user;
                dispatch(authenticate(user));
            })
            .catch(err => {
                console.error(err);
                dispatch(signupError("signup", err.response.status))
            })
    }
}


export function login(credentials){
    return dispatch => {
        return authAxios.post('/auth/login', credentials)
            .then(response => {
                const {token, user} = response.data;
                localStorage.token = token;
                localStorage.user = JSON.stringify(user);
                dispatch(authenticate(user));
            })
            .catch(err => {
                console.error(err);
            })
    }
}

export function authenticate(user){
    return {
        type: "AUTHENTICATE",
        user
    }
}

export function logout(){
    delete localStorage.token;
    delete localStorage.user;
    return {
        type: "LOGOUT"
    }
}


function signupError(key, errCode){
    return {
        type: "SIGNUP_ERROR",
        key,
        errCode
    }
}


function reducer(state = initialState, action){
    switch(action.type){
        case "AUTHENTICATE":
            return {
                ...state,
                ...action.user,
                isAuthenticated: true,
                authErrCode: {
                    signup: '',
                    signin: ''
                }
            }
        case "LOGOUT":
            return initialState
        case "SIGNUP_ERROR":
            return {
                ...state,
                authErrCode: {
                    ...state.authErrCode,
                    [action.key]: action.errCode
                }
            }
        default:
            return state
    }
}

export default reducer;
