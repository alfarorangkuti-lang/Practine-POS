import { api } from "../lib/axios";

export type Category = {
    id:number
    name:string
}

export const getCategories = async() => {
    const response = await api.get('/categories')
    return response.data
}

export const createCategory = async(name: string) => {
    const response = await api.post('/categories', {name: name})
    return response.data
}

export const deleteCategory = async(id: number) => {
    const response = await api.delete(`/categories/${id}`)
    return response
}

export const updateCategory = async(id: number, name:string) => {
    const response = await api.put(`/categories/${id}`, {name: name})
    return response
}