import { Request, Response } from "express";
import pool from "../config/db";
import { ResultSetHeader } from "mysql2";


export type items = {
    id_product:number 
    qty: number
}

export const getTransactions = async(req:Request, res:Response) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM transactions")
        res.json(rows)        
    } catch (error: unknown) {
        console.error(`error : ${error}`)
        res.status(500).json({message: "internal server error"})
    }
}

export const createTransaction = async(req:Request, res:Response) => {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        
        const { cart, payment_amount } : {cart : items[], payment_amount: number} = req.body
        const [resultTransaction] = await conn.execute<ResultSetHeader>("INSERT INTO transactions (total,payment_amount) VALUE (?, ?)", [0, payment_amount])
        const transactionId = resultTransaction.insertId
        let total = 0

        for (const item of cart) {
            const [product]: any = await conn.execute("SELECT price,stock FROM products WHERE id = ?", [item.id_product])
            const current_stock = product[0].stock - item.qty
            if (current_stock < 0) {
                await conn.rollback();
                res.status(400).json({message : "stock kurang"})
                break
            }
            const [resultStock] = await conn.execute("UPDATE products SET stock = ? WHERE id = ?", [current_stock, item.id_product])
            let subtotal = item.qty * product[0].price
            total += subtotal
            const [result] = await conn.execute("INSERT INTO transaction_detail (id_product, id_transaction, qty, subtotal) VALUES (?,?,?,?)", [item.id_product, transactionId, item.qty, subtotal])
        }
        let change_money = payment_amount - total
        if (change_money < 0) {
            await conn.rollback();
            res.status(400).json({message : "jumlah pembayaran kurang", total: total})
        }
        const [finalResult] = await conn.execute("UPDATE transactions SET total = ?, change_money = ? WHERE id = ?", [total, change_money, transactionId])
        await conn.commit();
        res.json({message : "berhasil!"})


    } catch (error) {
        await conn.rollback();
        res.status(500).json({error})
    }
}