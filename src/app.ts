import express, { type Application, type Request, type Response } from "express"

import { initDB, pool } from "./db"
import { UserRoute } from "./modules/users/users.route"
import { router } from "./router"
import logger from "./middleware/logger"

export const app:Application = express()


app.use(express.json())
app.use('/api/v1/',router)
app.use(logger)







initDB()
app.get('/api/v1/', (req:Request, res:Response) => {
  res.send('Hello World!');
})
