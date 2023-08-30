import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Module } from '../../../model/Module';
import { SubModule } from '../../../model/SubModule';
import { ModuleFunction } from '../../../model/ModuleFunction';
import { SubmoduleService } from '../../services/submodule.service';
import { ModuleServicesService } from '../../services/module-services.service';

@Component({
  selector: 'module-form',
  templateUrl: './moduleform.component.html',
  styleUrls: ['./moduleform.component.css']
})
export class ModuleFormComponent implements OnInit {
  moduleForm!: FormGroup;
  submodules: SubModule[] = [];
  selectedSubmodules: SubModule[] = [];
  module!: Module;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ModuleFormComponent>,
    private submoduleService: SubmoduleService,
    private moduleService: ModuleServicesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.moduleForm = this.formBuilder.group({
      moduleName: [this.data?.module?.moduleName || '', Validators.required],
      submodules: [this.selectedSubmodules],
    });
  
    this.submoduleService
      .getAllSubModules()
      .pipe(
        map((submodules: SubModule[]) => {
          return submodules.map((submodule) => {
            const selected = this.data?.module?.list_sub_modules?.some((s: SubModule) => s.id === submodule.id) || false;
            return {
              ...submodule,
              selected
            };
          });
        })
      )
      .subscribe((submodules) => {
        this.submodules = submodules;
        this.selectedSubmodules = submodules.filter((s) => s.selected);
        // Update the selected state of submodules in the form group
        this.moduleForm.patchValue({submodules: this.selectedSubmodules});
      });
  }
  

  saveModule(): void {
    if (this.moduleForm?.valid) {
      const moduleToSend = {
        id: this.data?.module?.id||0,
        moduleName: this.moduleForm.value.moduleName,
       
        group_module: [],
      };
      console.log(moduleToSend)
      console.log(this.selectedSubmodules[1])
      if (moduleToSend.id === 0) {
        this.moduleService.addModule(moduleToSend).subscribe((module: Object) => {
          this.dialogRef.close();
        });
      } else {
        const moduleToSend = {
          id: this.data?.module?.id||0 ,
          moduleName: this.moduleForm.value.moduleName,
          // list_sub_modules: this.selectedSubmodules[0].map((sub:SubModule)=> {
          //   return {
          //     id: sub.id,
          //     subModuleName: sub.subModuleName,
          //     path: sub.path,
          //     functions: sub.functions
          //   };
          // }),
          group_module: [],
        };
        this.moduleService.updateModule(moduleToSend, moduleToSend.id).subscribe((module: Object) => {
          this.dialogRef.close();
        });
      }
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  // toggleSubmodule(submodule: SubModule): void {
  //   const index = this.selectedSubmodules.findIndex((s) => s.id === submodule.id);
  //   if (index !== -1) {
  //     this.selectedSubmodules.splice(index, 1);
  //   } else {
  //     this.selectedSubmodules.push(submodule);
  //   }
  //   console.log(this.selectedSubmodules)
  // }

}