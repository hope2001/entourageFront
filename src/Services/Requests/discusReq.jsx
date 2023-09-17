
import Axios from "./interceptor";

/**
 * Connexion vers l'API
 * 
 * /
 
/** 
 * @param {object} udata
 * @returns {Promise}
 */
let discuss = (chat) => {
    // return Axios.post('/message/prompt?json_data='+[]+"&discussion_id="+discussion_id+"&message="+message)
    return Axios.post('/chat/add?chat='+chat)
    // return Axios.post('/message/prompt?json_data='+json_data+"&discussion_id="+discussion_id+"&message="+message)
}

/** 
 * @param {object} udata
 * @returns {Promise}
 */
let getDiscuss = () => {
    return Axios.get('/chat/') 
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

export const DiscussRequest = {
    discuss, getDiscuss
}