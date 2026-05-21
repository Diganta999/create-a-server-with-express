import express, { type Application, type Request, type Response } from "express"
import cookieParser from "cookie-parser"

import { initDB, pool } from "./db"
import { UserRoute } from "./modules/users/users.route"
import { router } from "./router"
import logger from "./middleware/logger"
import auth from "./middleware/checkAuth"
import cors from "cors"
import globalErrorHandler from "./middleware/globalErrorHandler"

export const app:Application = express()


app.use(express.json())
app.use(cookieParser())
app.use(logger)
app.use(cors({
  origin:"http://localhost:7000/"
}))

app.use('/api/v1/',router)









app.get('/api/v1/', (req:Request, res:Response) => {
  res.send('Hello World!');
})
app.use(globalErrorHandler)
