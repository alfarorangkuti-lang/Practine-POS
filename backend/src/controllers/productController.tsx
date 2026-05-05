import { Request, Response } from "express";
import pool from "../config/db";
import { ResultSetHeader } from "mysql2";
import upload from "../lib/multer";

export const getProducts = async(req:Request ,res: Response) => {
    try {
            const [result] = await pool.execute(
                "SELECT products.*, categories.name AS category_name FROM products INNER JOIN categories ON products.category_id = categories.id "
            )
            res.status(200).json(result)
    } catch (error) {
            res.status(500).json(`${error}`)
    }
}

export const getProductById = async(req:Request, res:Response) => {
    try {
        
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                message: "ID wajib diisi",
            });
        }
        const [result] = await pool.execute(
            "SELECT products.*, categories.name AS category_name FROM products INNER JOIN categories ON products.category_id = categories.id WHERE products.id = ? ", [id]
        )

        res.status(200).json(result)

    } catch (error) {
        res.status(500).json(`${error}`)
    }
}

export const destroy = async(req:Request, res:Response) => {
    try {
        
        const id = req.params
        const result = await pool.execute(
            "DELETE FROM products WHERE id = (?)", [id]
        )

        res.status(200).json({message: "Berhasil!"})

    } catch (error) {
        res.status(500).json(`${error}`)
    }
}

export const create =  async(req:Request, res:Response) => {
    try {

        const {name, price, description, stock, category_id} = req.body
        const imagePath = req.file?.filename;
        const [result] = await pool.execute<ResultSetHeader>(
            "INSERT INTO products (name, price,image,deskripsi, stock, category_id) VALUE (?,?,?,?,?,?)", [name, price, imagePath, description, stock, category_id]
        )
        res.status(200).json({message: "berhasil!", insertId: result.insertId})

    } catch (error) {
        res.status(500).json(`${error}`)
    }
}

export const update = async(req:Request, res:Response) => {
    try {
        const id = req.params.id
        const {name, price, description, stock, category_id} = req.body
        const imagePath = req.file?.filename;
        const [result] = await pool.execute<ResultSetHeader>(
            "UPDATE products SET name = (?), price = (?), image = (?), deskripsi = (?), stock = (?), category_id = (?) WHERE id = (?)", [name, price, imagePath, description, stock, category_id, id]
        )
        res.status(200).json({message: "berhasil!", affectedRows: result.affectedRows})
        
    } catch (error) {
        res.status(500).json(`${error}`)
    }
}