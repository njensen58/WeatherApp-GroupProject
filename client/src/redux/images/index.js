import axios from 'axios';
import config from '../../config.js';
const imagesAxios = axios.create();


const TOKEN = config.PIC_TOKEN;


export function getImage(city){
    return dispatch => {
        return imagesAxios.get(`/photo?address=${city}`).then(response => {
            let image = response.data;
            dispatch({
                type: "GET_IMAGE",
                image
            })
        })
    }
}


function reducer(state = {}, action){
    switch(action.type){
        case "GET_IMAGE":
            return {
                image: action.image
            }
        default:
            return state;
    }
}



export default reducer;
