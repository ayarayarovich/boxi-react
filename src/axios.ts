import axios, { CreateAxiosDefaults } from 'axios'

import { UserService } from './shared/services'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const common: CreateAxiosDefaults = {
    baseURL: BASE_URL,
}

export const S_PUBLIC_AXIOS = axios.create({
    ...common,
})

export const S_PRIVATE_AXIOS = axios.create({
    ...common,
})

S_PRIVATE_AXIOS.interceptors.request.use(
    (request) => {
        const accessToken = UserService.getToken()
        if (accessToken) {
            request.headers.Authorization = `${accessToken}`
        }
        return request
    },
    (error: Error) => {
        return Promise.reject(error)
    },
)
