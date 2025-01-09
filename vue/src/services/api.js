import axios from 'axios';
import Validator from 'validatorjs';
let apiUrl = import.meta.env.VITE_API_URL;

export let postApi = async (url, formData) => {
    let resp = await axios.post(`${apiUrl}${url}`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    let { data } = resp;
    return data;
}


export let getApi = async (url) => {
    let resp = await axios.get(`${apiUrl}${url}`);
    if (resp) {
        let { data } = resp;
        return data;
    }
    else {
        return [];
    }
}
export let deleteApi = async (url) => {
    let resp = await axios.delete(`${apiUrl}${url}`);
    if (resp) {
        let { data } = resp;
        return data
    }
    else {
        return []
    }
}
export let putApi = async (url, formData) => {
    let resp = await axios.put(`${apiUrl}${url}`, formData);
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


