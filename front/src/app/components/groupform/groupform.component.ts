import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { GroupModuleService } from 'src/app/services/group-module.service';
import { group_module } from 'src/model/group_module';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Module } from 'src/model/Module';
import {SubModule} from 'src/model/SubModule';
import { ModuleServicesService } from 'src/app/services/module-services.service';
import { CommonModule } from '@angular/common';
import { FunctionService } from 'src/app/services/function.service';
import { ModuleFunction } from 'src/model/ModuleFunction';
import { SubmoduleService } from 'src/app/services/submodule.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './groupform.component.html',
  styleUrls: ['./groupform.component.css']
})

export class GroupFormComponent implements OnInit {
  group!: group_module;
  form!: FormGroup;
  modules: Module[] = [];
  selectedModuleIds:any[] | undefined
  functions: ModuleFunction[] | undefined;
  submodules: SubModule[] = [];

  constructor(
    private dataService: GroupModuleService,
    @Inject(ModuleServicesService) private moduleService: ModuleServicesService,
    @Inject(FunctionService) private funcService: FunctionService,
    @Inject(SubmoduleService) private subModuleService: SubmoduleService,
    public dialogRef: MatDialogRef<GroupFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      gName: ['', [Validators.required, Validators.minLength(3)]],
      gDescription: ['', [Validators.required, Validators.minLength(8)]],
      modules: [[]],
      submodule: [null, Validators.required],
      function: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.moduleService.getAllModules().subscribe((modules: Module[]) => {
      this.modules = modules;
    });

    this.subModuleService.getAllSubModules().subscribe((submodules: SubModule[]) => {
      this.submodules = submodules;
    });
    
    this.funcService.getAllFunction().subscribe((functions: ModuleFunction[]) => {
      this.functions = functions;
    });
    

    this.group = this.data.group || {
      gId: 0,
      gName: '',
      gDescription: '',
      dateCreation: new Date(),
      dateModif: new Date(NaN),
      idCreateur: 0,
      nomUtilisateur: '',
      etat: '',
      module_groups: [],
      groupUsers: []
    };

    this.selectedModuleIds = this.group.module_groups.map((module: Module) => module.id);

    this.form.patchValue({
      gName: this.group.gName,
      gDescription: this.group.gDescription,
      modules: this.selectedModuleIds,
  })
  console.log(this.selectedModuleIds)
}

  onSubmit() {
    console.log(this.form)
    if (this.form.valid) {
      this.group.gName = this.form.value.gName;
      this.group.gDescription = this.form.value.gDescription;
      this.group.module_groups = this.form.value.modules.map((moduleId: number) => ({
        id: moduleId,
        moduleName: this.modules.find(m => m.id === moduleId)?.moduleName || '',
        list_sub_modules:this.submodules.find(s=>s?.module===moduleId)?.subModuleName
      }));
      

      console.log(this.group.module_groups)
      
      if (this.group.gId === 0) {
        this.group.dateCreation = new Date();
        this.dataService.addGroup(this.group)
          .subscribe(group => {
            this.dialogRef.close();
          });
      } else {
        this.group.dateModif = new Date();
        this.dataService.updateGroup(this.group, this.group.gId)
          .subscribe(group => {
            this.dialogRef.close();
          });
      }
    }
  }
  

  toggleModule(moduleId: number) {
    const modules = this.form.get('modules') as FormGroup;
    const moduleIds = modules.value as number[];
    const index = moduleIds.indexOf(moduleId);
    if (index === -1) {
      // Add module ID to selected modules
      moduleIds.push(moduleId);
    } else {
      // Remove module ID from selected modules
      moduleIds.splice(index, 1);
    }
    modules.patchValue(moduleIds);
  }

  close(): void {
    this.dialogRef.close();
}

compareModules(module1: Module, module2: Module): boolean {
  return module1.id === module2.id;
}

  
}