import axios from 'axios';

export function getOneUser(id) {
    return function(dispatch) {
        axios.get('/users/' + id).then(response => {
            dispatch({
                type: "GET_ONE_USER",
                user: response.data
            });
        });
    }
}

export function getAllUsers() {
    return function(dispatch) {
        axios.get('/users/').then(response => {
            dispatch({
                type: "GET_ALL_USERS",
                users: response.data
            });
        });
    }
}

export function postUser(newUser) {
    return function(dispatch) {
        axios.post('/users', newUser).then(response => {
            dispatch({
                type: "POST_NEW_USER",
                user: response.data
            });
        });
    }
}

export function putUser(id, update) {
    return function(dispatch) {
        axios.put('/users' + id, update).then(response => {
            dispatch({
                type: "PUT_USER",
                user: response.data
            });
        });
    }
}

export function deleteUser(id) {
    return function(dispatch) {
        axios.delete('/users/' + id).then(response => {
            dispatch({
                type: "DELETE_USER",
                userId: id
            });
        });
    }
}

function reducer(prevState = [], action) {
    switch (action.type) {
        case 'GET_ONE_USER':
            return action.user;
        case 'GET_ALL_USERS':
            return action.users;
        case 'POST_NEW_USER':
            return [...prevState, action.user];
        case 'PUT_USER':
            return prevState.map(user => {
                return user.id === action.user._id ? action.user : user;
            });
        case 'DELETE_USER':
            return prevState.filter(user => {
                return action.userId !== user._id;
            });
        default:
            return prevState;
    }
}

export default reducer;
