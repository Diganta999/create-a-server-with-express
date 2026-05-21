import { pool } from "../../db";
import bcrypt from "bcrypt";
import type { IUser } from "../users/user.interface"
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../../config";

const loginUser = async (payload: Partial<IUser>) => {
    const { email, password } = payload;
    const result = await pool.query(`
      SELECT * FROM users WHERE email = $1  
        `, [email])

    if (result.rows.length === 0) {
        throw new Error("Invalid credentials")
    }
    const user = result.rows[0]
    const matchPassword = await bcrypt.compare(password as string, user.password);
    if (!matchPassword) {
        throw new Error("Invalid credentials")
    }

    const jwtPayload = {
        id: user.id,
        email: user.email,
        role: user.role
    }
    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: config.ACCESS_TOKEN_EXPIRED_TIME as string }as jwt.SignOptions)
    const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret as string, { expiresIn: config.REFRESH_TOKEN_EXPIRED_TIME as string }as jwt.SignOptions)

    return { accessToken, refreshToken }

}

const generateRefreshToken = async (token: string) => {
    try {


        if (!token) {
            throw new Error("unauthorized")
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7);
        }

        const decodedToken = jwt.verify(
            token,
            config.jwt_refresh_secret as string
        ) as JwtPayload;

        const userData = await pool.query(
            `SELECT * FROM users WHERE email=$1`,
            [decodedToken.email]
        );

        const user = userData.rows[0];

        if (!user) {
            throw new Error("user not found")
        }
        if (!user.is_active) {
            throw new Error("user is not active")
        }
        const jwtPayload = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        const accessToken = jwt.sign(
            jwtPayload,
            config.jwt_access_secret as string,
            { expiresIn: config.ACCESS_TOKEN_EXPIRED_TIME as string } as jwt.SignOptions
        )
        return {accessToken}

    } catch (error: any) {
        throw new Error(error)
    }
}

export const AuthService = {
    loginUser,
    generateRefreshToken
}