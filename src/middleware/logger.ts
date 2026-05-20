import type { NextFunction, Request, Response } from "express";
import fs from "fs"

const logger = async(req:Request,res:Response,next:NextFunction)=>{
    const log = `This is method : ${req.method} and this is Time : ${Date.now()} and url is ${req.url}`

    fs.appendFile("index.txt",log,(error)=>{
       console.log(error);
    })
    next()
}

export default logger;