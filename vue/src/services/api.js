import { instance } from './interceptor'

export let postApi = async (url, formData) => {
    let resp = await instance.post(url, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    let { data } = resp;
    return data;
}


export let getApi = async (url) => {
    let resp = await instance.get(url);
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


