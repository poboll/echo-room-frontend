import axios from 'axios';

const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8082';

export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [(data) => {
            let ret = '';
            for (let i in data) {
                ret += `${encodeURIComponent(i)}=${encodeURIComponent(data[i])}&`;
            }
            return ret;
        }],
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
};

export const postRequest = (url, params) => axios.post(`${base}${url}`, params);
export const getRequest = (url) => axios.get(`${base}${url}`);