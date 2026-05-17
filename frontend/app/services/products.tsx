import { api } from "../lib/axios";

export type Products = {
    id: number
    name: string
    price: number
    stock: number
    image: string
    deskripsi: string
    category_name: string
}

export const getAllProducts = async() => {
    try {
        const res = await api.get("/products")
        return res.data        
    } catch (error) {
        return console.log(error)
    }
}

export const createProduct = async(formData: FormData) => {
    try {
        const res = await api.post("/products", formData)
        return res.data
    } catch (error) {
        return console.log(error)
    }
}

export const destroyProduct = async(id: string) => {
    try{
        const res = await api.delete(`/products/${id}`)
        return res.data
    } catch(error) {
        return console.log(error)
    }
}

export const getProductById = async(id: string) => {
    try{
        const res = await api.get(`/products/${id}`)
        return res.data
    } catch(error) {
        return console.log(error)
    }
}