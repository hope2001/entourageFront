

import axios from 'axios'
// import { toast } from 'react-toastify';
import { toast } from 'react-toastify';
import { Tokenn } from '../Helpers/TokenLogic';
import { back_api } from '../enviro';

// import { useRouter } from 'next/navigation'

// Paramétrage de base d'axios
const Axios = axios.create({
    baseURL: back_api
})
// const router = useRouter();

// Intercepteur pour la mise en place du token dans la requête
Axios.interceptors.request.use(request => {
    if (typeof window !== 'undefined') {
        console.log("INTERCEPTOR");
    if (Tokenn.checkToken()) {
        request.headers.Authorization = 'Bearer ' + Tokenn.getToken()
        // request.headers.ContentType = 'application/json; charset=UTF-8':
    }}

    // request.headers.AccessControlAllowOrigin = api;
    return request
})

// Intercepteur de réponse API pour vérification de la session

// Axios.interceptors.response.use(response => {
//     return response
// }, error => {
//     if (error.response) {
//         // The request was made, but the server responded with an error status
//         console.error(error.response.data);
//     } else if (error.request) {
//         // The request was made, but no response was received
//         console.error(error.request);
//     } else {
//         // Something happened in setting up the request that triggered an error
//         console.error(error.message);
//     }

//     return Promise.reject(error);
// }
// );

Axios.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response) {
      // The request was made, but the server responded with an error status
      const statusCode = error.response.status;
  
      if (statusCode === 401) {
        // Redirect user to login page
        if(typeof window !== 'undefined'){
            // toast(error.response.message, {
            //     hideProgressBar: false,
            //     autoClose: 5000,
            //     type: "danger" });
            Tokenn.dropToken()

            // window.location.href('/')
        }
      } else if (statusCode === 403) {
        // Remove token from local storage
        // localStorage.removeItem("token");
        if(typeof window !== 'undefined'){

        Tokenn.dropToken()
      }
      } else {
        // Something happened in setting up the request that triggered an error
        console.error(error.message);
      }
  
      return Promise.reject(error);
    } else if (error.request) {
      // The request was made, but no response was received
      console.error(error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error(error.message);
    }
  
    return Promise.reject(error);
  });

export default Axios