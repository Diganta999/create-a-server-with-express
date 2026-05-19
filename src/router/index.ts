import { Router } from "express";
import { UserRoute } from "../modules/users/users.route";
import { ProfileRoute } from "../modules/profiles/profiles.route";
import { AuthRoute } from "../modules/auth/auth.route";

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
,
{
    path:"/auth",
    route:AuthRoute
}
]

modulesRoute.forEach((route)=>{
    router.use(route.path,route.route)
})