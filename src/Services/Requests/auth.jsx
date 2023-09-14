
import Axios from "./interceptor";

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
    return Axios.post('/login/token', credentials)
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