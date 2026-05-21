export interface IUser {
    name:string,
    email:string,
    password:string,
    age:number,
    is_active?:boolean,
    role?:Role
}
export enum Role {
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN",
    USER = "USER"
}