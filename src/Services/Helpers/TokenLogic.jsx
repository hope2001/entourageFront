const saveToken=(token)=>{
    if (typeof window !== 'undefined') {
    localStorage.setItem('EntouragTkN', token);
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
        console.log(`TOKEN: ${token}`);
        return token;
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
    saveToken, checkToken, getToken, dropToken
}