import express, { type Application, type Request, type Response } from "express"

import { initDB, pool } from "./db"
import { UserRoute } from "./modules/users/users.route"
import { router } from "./router"
import logger from "./middleware/logger"
import auth from "./middleware/auth"

export const app:Application = express()


app.use(express.json())
app.use(logger)

app.use('/api/v1/',router)








initDB()
app.get('/api/v1/', (req:Request, res:Response) => {
  res.send('Hello World!');
})
