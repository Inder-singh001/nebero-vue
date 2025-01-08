import axios from 'axios';
import Validator from 'validatorjs';

export let postApi = async (url, formData) => {
    let apiUrl = import.meta.env.VITE_API_URL;
    // const Senddata = Array.isArray(formData) ? { items: formData } : { data: formData };
    let resp = await axios.post(`${apiUrl}${url}`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    let { data } = resp;
    return data;
}


export let getApi = async (url) => {
    let apiUrl = import.meta.env.VITE_API_URL;
    let resp = await axios.get(`${apiUrl}${url}`);
    if (resp) {
        let { data } = resp;
        return data;
    }
    else {
        return [];
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

export let validatorMake = async (data, rules, message) => {
    let validation = new Validator(data, rules, message);
    console.log(validation)
    return validation;
}

export const foreach = (obj, callback) => {
    for (let [key, value] of Object.entries(obj)) {
        callback(key, value);
    }
    return true;
}

