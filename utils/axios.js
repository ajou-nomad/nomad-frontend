/* eslint-disable prettier/prettier */
import axios from 'axios';
import { getAccessToken } from './helper';


const API_DEFAULT = 'http://3.36.251.255:8080';

const axiosApiInstance = axios.create({
    baseURL: API_DEFAULT,
});

//api 요청시 사전에 토큰을 header에 셋팅
axiosApiInstance.interceptors.request.use(
    async (config) => {
        try {
            const accessToken = await getAccessToken();
            config.headers = {
                'Authorization': `${accessToken}`,
                'Content-Type': 'application/json',
            };

            return config;
        } catch (e) {
            console.log(e);
        }

    },
    (error) => {

        return Promise.reject(error);
    }
);


// 토큰 만료시 재요청
axiosApiInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {

        const originalRequest = error.config;

        if (!error.response) {
            return Promise.reject('Network Error');
        }

        if ( (error.response.status === 401) && !originalRequest._retry) {
            console.log('토큰이 만료되었습니다.');
            originalRequest._retry = true;
            const access_token = await getAccessToken();
            axios.defaults.headers.common.Authorization = 'Bearer ' + access_token;

            return axiosApiInstance(originalRequest);
        }
        return Promise.reject(error);
  }
);

export default axiosApiInstance;
