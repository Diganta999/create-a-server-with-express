import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { UserController } from "./user.controller";

const router =Router()

router.post('/',UserController.createUser)
router.get("/",UserController.getUser)
router.get("/:id",UserController.getSingleUser)

router.put("/:id",UserController.updateUser)

router.delete('/:id',UserController.deleteUser );





export const UserRoute = router;