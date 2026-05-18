import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { UserController } from "./user.controller";

const router =Router()

router.post('/users',UserController.createUser)
router.get("/users",UserController.getUser)
router.get("/users/:id",UserController.getSingleUser)

router.put("/users/:id",UserController.updateUser)

router.delete('/users/:id',UserController.deleteUser );





export const UserRoute = router;