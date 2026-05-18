import express, { type Application, type Request, type Response } from "express"

import { initDB, pool } from "./db"
import { UserRoute } from "./modules/users/users.route"

export const app:Application = express()


app.use(express.json())
app.use(UserRoute)






initDB()
app.get('/api/v1/', (req:Request, res:Response) => {
  res.send('Hello World!');
})
