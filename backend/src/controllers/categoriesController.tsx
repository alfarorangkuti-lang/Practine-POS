import { Request, Response } from "express";
import pool from "../config/db";
import { ResultSetHeader } from "mysql2";
export const getCategories = async (req: Request, res: Response) => {

    try {

    const [rows] = await pool.query(
        "SELECT * FROM categories"
    );
        res.json(rows);
    } catch (error: unknown) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const [result] = await pool.execute<ResultSetHeader>(
            "INSERT INTO categories (name) VALUES (?)",
            [name]
        )
        res.status(201).json({"message":"berhasil!", "data": result.insertId})
    }   
    
    catch(error: unknown){
        res.status(500).json(`${error}`)
    }
} 

export const updateCategory = async (req: Request, res:Response) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const [result] = await pool.execute<ResultSetHeader>(
            "UPDATE categories SET name = (?) WHERE id = (?)",
            [name, id]
        )

        res.status(201).json({"message" : "berhasil", "affected rows" : result.affectedRows})
    } catch (error: unknown) {
        res.status(500).json(`${error}`)
    }
}

export const deleteCategory = async (req:Request, res:Response) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                message: "ID wajib diisi",
            });
        }
        const [result] = await pool.execute<ResultSetHeader>(
            "DELETE FROM categories WHERE id = (?)", [id]
        )
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Kategori tidak ditemukan",
            });
        }
        res.status(200).json({"message" : "berhasil!", "affectedRows" : result.affectedRows})
    } catch (error: unknown) {
        res.status(500).json(`${error}`)
    }
}