import axios from 'axios';
import dotenv from "dotenv";
import config from "../../config.js";
const imagesAxios = axios.create();
dotenv.config();

cosnt TOKEN = config.PIC_TOKEN;

imagesAxios.interceptors.request.use(config => {
    const token = TOKEN;
    config.headers.Authorization = `Bearer ${token}`;
    return config
})

export function getImage(city){
    return dispatch => {
        return imagesAxios.get().then()
    }
}

function reducer(state = {}, action){
    switch(action.type) {
        case "GET_IMAGE":
            return {
                image: action.image
            }
        default:
            return state;
    }
}

export default reducer;
