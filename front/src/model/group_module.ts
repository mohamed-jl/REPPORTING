import { Module } from "./Module";
import { ModuleFunction } from "./ModuleFunction";

export interface group_module{
    gId : number;
    gName : string;
    gDescription : string;
    dateCreation : Date;
    dateModif : Date;
    idCreateur : number;
    nomUtilisateur : string;
    etat : string;
    module_groups : Module[];
    groupUsers : Array<any>;
    liste_function:ModuleFunction[];
}
