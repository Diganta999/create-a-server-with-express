import type { Request, Response } from "express";
import { AuthService } from "./auth.service";

const loginUser = async(req:Request,res:Response)=>{
    try {
              const result = await AuthService.loginUser(req.body)

              const {refreshToken}=result;
              res.cookie("refreshToken",refreshToken,{
                secure:false,// in production is true hobe 
                httpOnly:true,
                sameSite:"lax"
                 
              })
        
                res.status(201).json({
                message:"user login successfully",
                data:result
              })
            } catch (error:any) {
              res.status(500).json({
                message:error.message,
                error:error
              })
            }
}
const generateRefreshToken = async(req:Request,res:Response)=>{
  try {
              const result = await AuthService.generateRefreshToken(req.cookies.refreshToken)

             
        
                res.status(201).json({
                message:"refresh token generated successfully",
                data:result
              })
            } catch (error:any) {
              res.status(500).json({
                message:error.message,
                error:error
              })
            }
}

export const AuthController={
    loginUser,
    generateRefreshToken
}