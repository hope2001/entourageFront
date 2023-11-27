
import Axios from "./interceptor";

/**
 * Connexion vers l'API
 * 
 * /
 
/** 
 * @param {object} 
 * @returns {Promise}
 */
let userstats = () => {
    return Axios.get("/dashboard/userstats")
}

let conversesstats = () => {
    return Axios.get("/dashboard/conversestats")
}
let eventconversesstats = () => {
    return Axios.get("/dashboard/eventconversestats")
}
let ask1 = (message , answer,chat_id) => {
    return Axios.post('/converse/create',{query:message, answer:answer, chat_id:chat_id})
}

let ask2 = (data) => {
    // alert(JSON.stringify(data))
    return Axios.post('/converse/create', data)
}
let setlike = (c_id , like_status, reason) => {
    return Axios.put('converse/set_like',{converse_id:c_id, is_liked:like_status, reason:reason})
}

/** 
 * @param {object} udata
 * @returns {Promise}
 */
let getConverse = () => {
    return Axios.get('/converse/') 
}
/** 
 * @param {object} udata
 * @returns {Promise}
 */
let newConverse = (prompt) => {
    return Axios.post('/chat/add?chat='+prompt)
}
/** 
 * @param {object} udata
 * @returns {Promise}
 */
let userLogedData = () => {
    return Axios.get('/token/users/me/')
}

export const DashRequest = {
    userstats,conversesstats, eventconversesstats
}