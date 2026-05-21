import type { NextFunction, Request, Response } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../config"
import { pool } from "../db"
const checkAuth = (...authRole: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ message: "unauthorized" });
      }

      if (token.startsWith("Bearer ")) {
        token = token.slice(7);
      }

      const decodedToken = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;

      const userData = await pool.query(
        `SELECT * FROM users WHERE email=$1`,
        [decodedToken.email]
      );

      const user = userData.rows[0];

      if (!user) {
        return res.status(401).json({ message: "user not found" });
      }
      if(!user.is_active){
        return res.status(401).json({ message: "user is not active" });
      }

      if (authRole.length && !authRole.includes(user.role)) {
        return res.status(403).json({ message: "forbidden" });
      }

      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({
        message: "invalid token",
      });
    }
  };
};
export default checkAuth;