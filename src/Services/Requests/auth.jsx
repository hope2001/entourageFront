
import Axios from './interceptor';
// import { axios } from 'axios';
// import axios from "axios";
// import axios from "axios";

/**
 * Connexion vers l'API
 * 
 * /
 
/** 
 * @param {object} udata
 * @returns {Promise}
 */
let register = (udata) => {
    console.log(udata);
    return Axios.post('/users', udata)
}

/** 
 * @param {object} udata
 * @returns {Promise}
 */
let Login = (credentials) => {
    return Axios.post('/token', credentials)
}
/** 
 * @param {object} udata
 * @returns {Promise}
 */
let userLogedData = () => {
    return Axios.get('/token/users/me/')
}

export const AuthSys = {
    register,Login, userLogedData
}