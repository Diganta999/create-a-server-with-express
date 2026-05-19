import { pool } from "../../db";
import bcrypt from "bcrypt";
import type { IUser } from "../users/user.interface"
import jwt from "jsonwebtoken"
import config from "../../config";

const loginUser = async (payload: Partial<IUser>) => {
    const {email,password}=payload;
    const result = await pool.query(`
      SELECT * FROM users WHERE email = $1  
        `,[email])
        
        if(result.rows.length===0){
            throw new Error("Invalid credentials")
        }
         const user = result.rows[0]
         const matchPassword = await bcrypt.compare(password as string, user.password);
         if(!matchPassword){
            throw new Error("Invalid credentials")
         }

         const jwtPayload = {
            id:user.id,
            email:user.email
         }
         const accessToken = jwt.sign(jwtPayload,config.jwt_secret as string,{expiresIn:"1d"})

         return accessToken

}

export const AuthService ={
    loginUser
}