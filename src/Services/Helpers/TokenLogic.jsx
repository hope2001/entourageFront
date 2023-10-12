const saveToken=(token)=>{
    if (typeof window !== 'undefined') {
    localStorage.setItem('EntouragTkN', token);
}
}
const saveAdminToken=(token, key)=>{
    if (typeof window !== 'undefined') {
    localStorage.setItem('EntouragTkN', token);
    localStorage.setItem('EntouragTkNadmin', key);
}
}

const checkToken = ()=>{
    if (typeof window !== 'undefined') 
    {
    return!!localStorage.getItem("EntouragTkN");
    }
}

const getToken = ()=>{
    if(checkToken()){
        const token=localStorage.getItem("EntouragTkN");
        // console.log(`TOKEN: ${token}`);
        return token;
    }
}
const getAdminToken = ()=>{
    if(checkToken()){
        const key=localStorage.getItem("EntouragTkNadmin");
        // console.log(`TOKEN: ${token}`);
        return key;
    }
}



const getToken1 = ()=>{
    if (typeof window !== 'undefined') {
    if(checkToken()){
        const token=JSON.parse(atob(localStorage.getItem("EntouragTkN")));
        console.log(`TOKEN: ${token}`);
    }}
}



const dropToken = ()=>{
    if (typeof window !== 'undefined') {
    localStorage.removeItem("EntouragTkN")}
    
    console.log("token droped");
}

export const Tokenn = {
    saveToken, checkToken, getToken, dropToken,saveAdminToken, getAdminToken
}