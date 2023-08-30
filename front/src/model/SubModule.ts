import { Module } from "./Module";
import { ModuleFunction } from "./ModuleFunction";

export interface SubModule {
    map: any;
    id: number;
    path: string;
    module?: number;
    subModuleName: string;
    functions: ModuleFunction[];
    expanded?:boolean;
    selected?:boolean;
    isOpen: boolean;
    description?:any;
  }