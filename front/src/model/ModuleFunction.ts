import { SubModule } from "./SubModule";

export interface ModuleFunction {
    id: number;
    functionName: string;
    subModule:SubModule;
    selected?:boolean;
    description?:any;
  }