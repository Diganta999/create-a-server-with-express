import type { Request, Response } from "express";
import { ProfileService } from "./profile.service";

const createProfile = async(req:Request,res:Response)=>{
try {
          const result = await ProfileService.createProfile(req.body)
    
            res.status(201).json({
            message:"data created successfully",
            data:result.rows[0]
          })
        } catch (error:any) {
          res.status(500).json({
            message:error.message,
            error:error
          })
        }
}

export const UserProfile = {
    createProfile
}