import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { UserController } from "./user.controller";
import auth from "../../middleware/checkAuth";
import checkAuth from "../../middleware/checkAuth";
import { Role } from "./user.interface";

const router =Router()

router.post('/',UserController.createUser)
router.get("/",checkAuth(Role.ADMIN,Role.SUPER_ADMIN,Role.USER),UserController.getUser)
router.get("/:id",UserController.getSingleUser)

router.put("/:id",UserController.updateUser)

router.delete('/:id',UserController.deleteUser );





export const UserRoute = router;