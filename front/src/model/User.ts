import { Role } from "./Role";
import { group_module } from "./group_module";

export interface User{
    uId:number,
    username:string,
    dateCreation:Date,
    dateModif:Date,
    etat:string,
    idCreateur:number,
    nomUtilisateur:string,
    uDepart:string,
    uLogin:string,
    uMail:string,
    uMatricule:string,
    password:string,
    token?: String
    user_group: group_module | null,
    listreprapport?:[],
    role: Role |null 
}