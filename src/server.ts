import express, { type Application, type Request, type Response } from "express"
import {Pool} from "pg"
import config from "./config"
const app:Application = express()


app.use(express.json())



const pool = new Pool({
    connectionString:config.connection_string
})

const initDB = async()=>{
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(20),
      email VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(20) NULL,
      age INT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()

      )
      
      
      `)
      console.log("Database connected successfully");
  } catch (error) {
    console.log(error)
  }
}
initDB()
app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})
app.post('/users',async(req:Request, res:Response)=>{
    const body=req.body;
    const {name,email,password,age}=body;
    try {
      const result = await pool.query(`
       INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4)     
       RETURNING * 
        `,[name,email,password,age])

        res.status(500).json({
        message:"data created successfully",
        data:result.rows[0]
      })
    } catch (error:any) {
      res.status(500).json({
        message:error.message,
        error:error
      })
    }
})
app.get("/users",async(req:Request,res:Response)=>{
  try {
    const result = await pool.query(`
      SELECT * from users
      
      `)
      res.status(500).json({
        message:"data retrieve successfully",
        data:result.rows
      })
  } catch (error:any) {
    res.status(500).json({
        message:error.message,
        error:error
      })
  }
})
app.get("/users/:id",async(req:Request,res:Response)=>{
  try {
    const id=req.params.id;
    const result = await pool.query(`
      SELECT * from users WHERE id = $1
      
      `,[id]) 
      if(result.rows.length===0){
        res.status(404).json({
        message:"data  not exist in table",
        data:{}
        
      })
      }
      res.status(500).json({
        message:"data retrieve successfully",
        data:result.rows[0]
      })
  } catch (error:any) {
    res.status(500).json({
        message:error.message,
        error:error
      })
  }
})

app.put("/users/:id",async(req:Request,res:Response)=>{
  const id = req.params.id;
  try {
    const {email,age}=req.body;
    const result = await pool.query(`
       UPDATE users
      SET email=COALESCE($1, email) ,
      age= COALESCE($2, age)
       WHERE  id = $3 
       RETURNING *  
      
      `,[email,age,id])

       res.status(500).json({
        message:"data retrieve successfully",
        data:result.rows[0]
      })
  } catch (error:any) {
     res.status(500).json({
        message:error.message,
        error:error
      })
  }
})

app.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await pool.query(
      `
      DELETE FROM users
      WHERE id = $1
      `,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "data not exist in table",
        data: {}
      });
    }

    res.status(200).json({
      message: "data delete successfully",
      data: {}
    });

  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error
    });
  }
});

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
})
