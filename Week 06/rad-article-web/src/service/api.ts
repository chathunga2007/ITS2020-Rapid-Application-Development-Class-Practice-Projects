import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:3000/api/v1/"
})

const PUBLIC_ENPOINTS = ["auth/login", "auth/register"]

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("ACCESS_TOKEN")

    const isPublic = PUBLIC_ENPOINTS.some((url) => config.url?.includes(url))
    if(token && !isPublic){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// api.interceptors.response

export default api