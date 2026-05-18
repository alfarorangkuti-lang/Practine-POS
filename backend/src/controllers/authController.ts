import bcrypt from "bcryptjs"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { RowDataPacket } from "mysql2"
import pool from "../config/db"

interface User extends RowDataPacket {
    id: number
    username: string
    password: string
}

export const login = async(req: Request, res: Response) => {
    try {
        
    const {username, password} = req.body
    const [result] = await pool.query<User[]>("SELECT * FROM users WHERE username = ?", [username])
    const user = result[0]
    
    if(!user){
        return res.status(404).json({message:"user tidak ditemukan!"})
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(400).json({message: "Password salah!"})
    }

    const token = jwt.sign({id: user.id, user: user.username}, process.env.JWT_SECRET as string, {expiresIn: "1d"})
    res.json({token})
    } catch (error) {
        res.status(500).json(
            {error}
        )
    }
}