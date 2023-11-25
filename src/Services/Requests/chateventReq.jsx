
import Axios from "./interceptor";

/**
 * Connexion vers l'API
 * 
 * /
 
/** 
 * @param {object} udata
 * @returns {Promise}
 */
let ask = (d_id, message , answer) => {
    // return Axios.post('/message/prompt?json_data='+[]+"&discussion_id="+discussion_id+"&message="+message)
    return Axios.post('/message/prompt?discussion_id='+d_id+'&message='+message+'&answer='+answer)
    // return Axios.post('/message/prompt?json_data='+json_data+"&discussion_id="+discussion_id+"&message="+message)
}
let ask1 = (message , answer,chat_id) => {
    return Axios.post('/eventconverse/create',{query:message, answer:answer, chat_id:chat_id})
}

let ask2 = (data) => {
    // alert(JSON.stringify(data))
    return Axios.post('/eventconverse/create', data)
}
let setlike = (c_id , like_status, reason) => {
    return Axios.put('/eventconverse/set_like',{converse_id:c_id, is_liked:like_status, reason:reason})
}

/** 
 * @param {object} udata
 * @returns {Promise}
 */
let getConverse = () => {
    return Axios.get('/eventconverse/') 
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

export const ChatEventRequest = {
    ask, newConverse,getConverse,ask1,ask2,setlike
}