import api from "../lib/axios"
import axios from "axios"

export const login = async(username: string, password: string) => {
    try {
        const response = await api.post('/auth/login', {username, password})
        localStorage.setItem("token", response.data.token)   
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message)
        }
        throw error
    }
}