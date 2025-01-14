import axios from 'axios';
import { instance } from './interceptor';

const apiUrl = import.meta.env.VITE_API_URL;

export let postApi = async (url, formData) => {
    let resp = await instance.post(`${url}`, formData)
    if (resp.status) {
        let { data } = resp;
        return data;
    }
    else {
        return []
    }
}

export let getApi = async (url) => {
    let resp = await instance.get(`${apiUrl}${url}`);
    if (resp) {
        let { data } = resp;
        return data;
    }
    else {
        return [];
    }
}
export let deleteApi = async (url) => {
    let resp = await instance.delete(url);
    if (resp) {
        let { data } = resp;
        return data
    }
    else {
        return []
    }
}
export let putApi = async (url, formData) => {
    let resp = await instance.put(url, formData);
    if (resp) {
        let { data } = resp;
        return data
    }
    else {
        return []
    }
}
export const getUserDetails = async () => {
    try {
        const detail = await getApi('/user')
        return detail
    } catch (e) {
        console.log(e)
    }
}

export const setToken = (key, token) => {
    return localStorage.setItem(key, token)
}
export const getToken = (key) => {
    return localStorage.getItem(key)
}


