import api from "../lib/axios";

export type CartBackend = {
    id_product: number
    qty: number
}

export const createTransaction = async(cart: CartBackend[], paymentAmount: number) => {
    try {
        const res = await api.post('/transactions', {cart: cart, payment_amount: paymentAmount})
        return res.data
    } catch (error) {
        return console.log(error)
    }
    
}