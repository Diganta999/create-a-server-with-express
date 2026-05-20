import type { Request, Response } from "express";
import { pool } from "../../db";
import { UserService } from "./user.service";

const createUser = async(req:Request,res:Response)=>{
        
        
        try {
          const result = await UserService.createUser(req.body)
    
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

const getUser = async(req:Request,res:Response)=>{
      try {
        console.log(req.user ,"token ")
        const result = await UserService.getUser();
          res.status(200).json({
            message:"data retrieve successfully",
            data:result.rows
          })
      } catch (error:any) {
        res.status(500).json({
            message:error.message,
            error:error
          })
      }
}

const getSingleUser = async(req:Request,res:Response)=>{
      try {
        const id=req.params.id;
        const result = await UserService.getSingleUser(id);
          if(result.rows.length===0){
            res.status(404).json({
            message:"data  not exist in table",
            data:{}
            
          })
          }
          res.status(200).json({
            message:"data retrieve successfully",
            data:result.rows[0]
          })
      } catch (error:any) {
        res.status(500).json({
            message:error.message,
            error:error
          })
      }
}
const updateUser = async(req:Request,res:Response)=>{
      const id = req.params.id;
      try {
        
        const result = await UserService.updateUser(req.body, id);
        
    
           res.status(200).json({
            message:"data retrieve successfully",
            data:result.rows[0]
          })
      } catch (error:any) {
         res.status(500).json({
            message:error.message,
            error:error
          })
      }
}

const deleteUser = async(req:Request,res:Response)=>{
      const id = req.params.id;
      try {
        const result = await UserService.deleteUser(id)
    
           res.status(200).json({
            message:"data deleted successfully",
            data:result.rows[0]
          })
      } catch (error:any) {
         res.status(500).json({
            message:error.message,
            error:error
          })
      }
}

export const UserController = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}

