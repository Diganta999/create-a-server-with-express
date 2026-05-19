import { Router } from "express";
import { UserRoute } from "../modules/users/users.route";
import { ProfileRoute } from "../modules/profiles/profiles.route";

export const router = Router()


const modulesRoute = [

{
    path:"/user",
    route:UserRoute
},
{
    path:"/profile",
    route:ProfileRoute
}
]

modulesRoute.forEach((route)=>{
    router.use(route.path,route.route)
})