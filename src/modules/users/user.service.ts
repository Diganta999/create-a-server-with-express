import type { Request, Response } from "express";
import { pool } from "../../db";
import type { IUser } from "./user.interface";

const createUser  = async(payload:IUser )=>{
    const {name,email,password,age}=payload;
    const result = await pool.query(`
           INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4)     
           RETURNING * 
            `,[name,email,password,age])

            return result;
}
const getUser =async()=>{
    const result = await pool.query(`
          SELECT * from users
          
          `)

          return result;
}
const getSingleUser = async(id:any)=>{
    const result = await pool.query(`
          SELECT * from users WHERE id = $1
          
          `,[id]) 
          return result
}

const updateUser = async(payload: Partial<IUser>, id:any)=>{
    const {email, age} = payload;
    const result = await pool.query(`
           UPDATE users
          SET email=COALESCE($1, email) ,
          age= COALESCE($2, age)
           WHERE  id = $3 
           RETURNING *  
          
          `,[email,age,id])

          return result;
}

const deleteUser = async (id:any)=>{
    const result = await pool.query(`
           DELETE FROM users WHERE id = $1 RETURNING *
        `,[id])
        return result;
}
export const UserService={
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}