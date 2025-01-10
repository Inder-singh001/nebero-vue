import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
export const instance = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    headers: {
        "Content-Type": 'application.json'
    }
})

instance.interceptors.request.use(
    (config) => {
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
        return response
    },
    (error) => {
        console.log('Response Error: ', error.message)
        if (error.response) {
            console.log('Response Details: ', {
                status: error.response.status,
                data: error.response.data
            })

            if (error.response.status == 404) {
                console.log('Response Not Found!')
            } else {
                console.log('Network Error!')
            }
        }
        return Promise.reject(error)
    }
)