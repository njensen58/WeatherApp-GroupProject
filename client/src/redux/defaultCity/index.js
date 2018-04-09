import axios from 'axios';
const cityAxios = axios.create();

cityAxios.interceptors.request.use(config => {
    const token = localStorage.token;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})


export function saveCity(city, id){
    return dispatch => {
        return cityAxios.put(`/api/userCity/${id}`, city).then(response => {
            dispatch({
                type: "SAVE_CITY",
                location: response.data.location
            })
        })
    }
}



function reducer(state = {}, action){
    switch(action.type){
        default:
            return state;
    }
}

export default reducer
