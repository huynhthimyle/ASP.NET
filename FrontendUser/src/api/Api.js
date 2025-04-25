import axios from "axios";

const Api = axios.create({
    baseURL: 'https://localhost:7192/api',

    headers: {
        'Content-Type': 'application/json',
    },
});
Api.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});
export default Api;


