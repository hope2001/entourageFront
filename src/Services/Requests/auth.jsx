
import Axios from "./interceptor";

/**
 * Connexion vers l'API
 * 
 * /
 
/** 
 * @param {object} udata
 * @returns {Promise}
 */
let Register = (udata) => {
    console.log(udata);
    return Axios.post('/user/register', udata)
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
    return Axios.get('/login/me')
}

export const AuthSys = {
    Register,Login, userLogedData
}