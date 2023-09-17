
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
let ask1 = (message , answer) => {
return Axios.post('/converse/create',{query:message, answer:answer})
}
let setlike = (c_id , like_status) => {
    return Axios.post('converse/set_like',{converse_id:c_id, is_liked:like_status})
}

/** 
 * @param {object} udata
 * @returns {Promise}
 */
let getConverse = () => {
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

export const ChatRequest = {
    ask, newConverse,getConverse,ask1,setlike
}