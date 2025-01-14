import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL;

export const instance = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json"
    }
})

instance.interceptors.request.use(
    (config) => {
        config.headers = config.headers || {};
        console.log(config.headers)
        config.headers.Authorization = `Bearer ${localStorage.getItem('authtoken')}`;
        console.log('token:', config.headers.Authorization)
        console.log('Request Sent: ', config.method.toUpperCase(), config.url)
        return config
    },
    (error) => {
        console.log('Request Error: ', error.message)
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response) => {
        console.log('Response Received: ', response.status, response.data)
        console.log(response)
        return response
    },
    (error) => {
        console.log('Response Error: ', error.message)
        if (error.response) {
            console.log('Response Details: ', {
                status: error.response.status,
                data: error.response.data
            })

            if (error.response.status == 401) {
                console.log('Response Details: ', {
                    status: error.response.status,
                    data: error.response.data
                })
            }
            else if (error.response.status == 404) {
                console.log('Response Not Found!')
            } else {
                console.log('Network Error!')
            }
        }
        return Promise.reject(error)
    }
)