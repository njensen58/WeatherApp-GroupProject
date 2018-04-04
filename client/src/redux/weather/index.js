import axios from 'axios';
import config from '../../config.js';
const weatherAxios = axios.create();



export function getWeather(city){
    return dispatch => {
        return weatherAxios.get(`/weather?address=${city}`).then(response => {
            dispatch({
                type: "GET_WEATHER",
                weather: response.data
            })
        })
        }
    }




function reducer(state = {}, action){
    switch(action.type){
        case "GET_WEATHER":
            return action.weather
        default:
            return state
    }
}


export default reducer;
