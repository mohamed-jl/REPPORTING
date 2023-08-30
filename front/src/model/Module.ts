import { SubModule } from "./SubModule";

export interface Module {
    id: number;
    moduleName: string;
    list_sub_modules: SubModule[];
    group_module: any[];
    description:any;
    expanded?: boolean;
    rotated?:boolean;
    selected?:boolean;
    isOpen: boolean;
  }