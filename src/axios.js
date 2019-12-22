import axios from 'axios';
import './index.css';
import history from './History';

const instance = axios.create({
    baseURL: 'https://minsights.herokuapp.com/api/',
    headers: {
        'Content-Type': 'application/json',
      },
});

instance.interceptors.request.use(config => {
    document.body.classList.add('loadingIndicator');
    if (['//users/login?include=user'].indexOf(config.url) === -1) {
        const token = JSON.parse(sessionStorage.getItem('access_token'));
        let sessionId = null
        if (token != null) {
            sessionId = token.access_token;
        }
        config.headers.Authorization = sessionId ? `${sessionId}` : '';
    }
    return config
})

instance.interceptors.response.use(response => {
    document.body.classList.remove('loadingIndicator');
    return response
})

export function handleErrorResponse(response) {
    document.body.classList.remove('loadingIndicator');
    if (typeof (response.response) === 'undefined') {
        console.log(response);
        return response;
    }
    console.log(response);
    if (response.response.status === 400) {
        alert(response.response.data.message)
        return response;
    } else if (response.response.status === 405) {
        return response;
    } else if (response.response.status === 422) {
        alert(response)
        return response;
    } else if (response.response.status === 401) {
        //alert('You are not allowed to perform this operation.');
        history.push('/login');
        return response;
    } else {
        return response;
    }
}

export default instance;