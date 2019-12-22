import Axios, {handleErrorResponse} from './../axios';

export function authenticateUser(callback, userData) {
    Axios.post(`/users/login?include=user`, userData) 
        .then( response => {
            callback(response);
        })
        .catch(error => {
            //console.log(error)
            handleErrorResponse(error);
        });
}