import type { NextFunction, Request, Response } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../config"
import { pool } from "../db"
const auth = () => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let token = req.headers.authorization;
            if (!token) {
                res.status(401).json({
                    message: "user is unauthorize",
                });
                return;
            }

            

            const decodedToken = jwt.verify(token as string, config.jwt_secret as string) as JwtPayload;
            const userData = await pool.query(`SELECT * FROM users WHERE email=$1`, [decodedToken.email]);
            const user = userData.rows[0];

            if (!decodedToken) {
                res.status(401).json({
                    message: "access Token is not verified",
                });
                return;
            }
            if (!user) {
                res.status(401).json({
                    message: "user is not exist",
                });
                return;
            }
            if (user.email !== decodedToken.email) {
                res.status(401).json({
                    message: "user is unauthorize ",
                });
                return;
            }
            req.user = decodedToken;

            next();
        } catch (error) {
            res.status(401).json({
                message: "invalid token or unauthorized",
                error
            });
            next(error)
        }
    }
}
export default auth;