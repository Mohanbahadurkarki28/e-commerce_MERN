import axios from "axios";
import {env, fromStorage} from "@/lib/functions.ts";
import {toast} from "react-toastify";

const http = axios.create({
    baseURL: env('API_URL'),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})
http.interceptors.request.use(request => {
    const token = fromStorage('m130ftoken')
    if(token){
        request.headers['Authorization']= `Bearer ${token}`
    }
    return request
}, error => Promise.reject(error))

http.interceptors.response.use(response => {
    if('message' in response.data){
        toast.success(response.data.message)
    }
    return response
}, error => {
    if('message' in error.response.data){
        toast.error(error.response.data.message)
    }
    return Promise.reject(error)
})

export default http