import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path:path.join(process.cwd(), ".env")
})

const config = {
    connection_string : process.env.CONNECTION_STRING as string,
    port : process.env.PORT,
    salt_rounds : process.env.SALT_ROUNDS,
    jwt_secret: process.env.JWT_SECRET
}

export default config;