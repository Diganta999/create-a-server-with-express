import { Router } from "express";
import { UserProfile } from "./profile.controller";

const router = Router()

router.post('/',UserProfile.createProfile)



export const ProfileRoute = router;