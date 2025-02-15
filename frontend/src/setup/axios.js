import axios from 'axios';
import { getCookie } from 'lib/function/function';
import env from 'react-dotenv';

const instance = axios.create({
    // baseURL: 'http://localhost:8000',
    baseURL: env.SERVER,
});

instance.defaults.withCredentials = true;
// // Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = `Bearer ${getCookie('jwt')}`;

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);
// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        const status = error.response?.status || 500;
        // we can handle global errors here
        switch (status) {
            // authentication (token related issues)
            case 401: {
                if (
                    window.location.pathname !== '/' &&
                    window.location.pathname !== '/login' &&
                    window.location.pathname !== '/register' &&
                    window.location.pathname !== '/forgetpassword'
                ) {
                    console.log('Not authenticated the user');
                }
                return error.response.data;
            }

            // forbidden (permission related issues)
            case 403: {
                alert(`You don't have permission to access this resource...`);
                return Promise.reject(error);
            }

            // bad request
            case 400: {
                return Promise.reject(error);
            }

            // not found
            case 404: {
                return Promise.reject(error);
            }

            // conflict
            case 409: {
                return Promise.reject(error);
            }

            // unprocessable
            case 422: {
                return Promise.reject(error);
            }

            // generic api error (server related) unexpected
            default: {
                return error;
            }
        }
        // return Promise.reject(error);
    },
);

export default instance;
