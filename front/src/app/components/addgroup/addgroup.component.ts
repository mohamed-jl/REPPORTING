import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Module } from 'src/model/Module';
import { ModuleServicesService } from 'src/app/services/module-services.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { group_module } from 'src/model/group_module';
import { GroupModuleService } from 'src/app/services/group-module.service';
import { Router } from '@angular/router';
import { SubModule } from 'src/model/SubModule';
import { ModuleFunction } from 'src/model/ModuleFunction';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.component.html',
  styleUrls: ['./addgroup.component.css']
})
export class AddgroupComponent implements OnInit {
  @ViewChild(Table) table: Table | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  modules: Module[] = [];
  dataSource: any;
  form!: FormGroup;
  group:  group_module = {
    gId: 0, gName: '', gDescription: '', module_groups: [], dateCreation: new Date(), dateModif: new Date(NaN),
    idCreateur: 0,
    nomUtilisateur: '',
    etat: '',
    groupUsers: [],
    liste_function: []
  };
  selectedGroup!:group_module;
  module:Module | undefined;
  selectedModules: Module[] = [];
  selectedSubModules: SubModule[] = [];
  selectedFunctions: ModuleFunction[] = [];
  selectedFunctionsList:ModuleFunction[]=[]
  

  constructor(private router: Router,private primengConfig: PrimeNGConfig,private dataService: GroupModuleService,private fb: FormBuilder,@Inject(ModuleServicesService) private data: ModuleServicesService,private route: ActivatedRoute) {
    this.form = this.fb.group({
      gName: ['', [Validators.required, Validators.minLength(3)]],
      gDescription: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    const groupId = this.route.snapshot.params['id'];
    if (groupId) {
      this.dataService.getGroupById(groupId).subscribe((group: group_module) => {
        this.group = group;
        this.form.setValue({
          gName: this.group.gName,
          gDescription: this.group.gDescription
        });
        this.selectedModules = this.group.module_groups;
        this.selectedFunctionsList = this.group.liste_function;
        this.selectedModules.forEach((module: Module) => {
          module.selected = true;
          module.expanded = true;
          module.list_sub_modules.forEach((submodule: SubModule) => {
            submodule.selected = true;
            submodule.expanded = true;
            submodule.functions.forEach((func: ModuleFunction) => {
              func.selected =
                this.selectedFunctionsList.findIndex(
                  (selectedFunc: any) => selectedFunc.id === func.id
                ) !== -1;
            });
          });
        });
      });
    } else {
      this.data.getAllModules().subscribe((data) => {
        this.modules = data.map((module) => ({
          ...module,
          selected: false,
          expanded: false,
          list_sub_modules: module.list_sub_modules.map((submodule) => ({
            ...submodule,
            selected: false,
            expanded: false,
            functions: submodule.functions.map((func) => ({
              ...func,
              selected: false
            }))
          }))
        }));
      });
    }
  }
  

  ngAfterViewInit(): void {
    this.primengConfig.ripple = true;
  }

  toggleSubModules(submodule: SubModule, module: Module) {
    submodule.expanded = !submodule.expanded;
    submodule.functions.forEach((func: ModuleFunction) => {
      func.selected = submodule.selected && func.selected;
    });
    module.selected =
      module.list_sub_modules.filter((submodule) => submodule.selected).length ===
      module.list_sub_modules.length;
  }
  
  

  toggleSelection(module: Module) {
    module.selected = !module.selected;
    module.list_sub_modules.forEach((submodule: SubModule) => {
      submodule.selected = module.selected;
      submodule.functions.forEach((func: ModuleFunction) => {
        func.selected = module.selected;
      });
    });
    if (module.selected) {
      this.selectedModules.push(module);
    } else {
      const index = this.selectedModules.indexOf(module);
      if (index !== -1) {
        this.selectedModules.splice(index, 1);
      }
    }
  }
  
  
  // Change the onFunctionsSelected() method to accept the checkbox state and the function as arguments
  onFunctionsSelected(checked: boolean, func: ModuleFunction) {
    func.selected = checked;
  
    if (checked) {
      // Add the function to the selected functions list if it is selected
      this.selectedFunctionsList.push(func);
    } else {
      // Remove the function from the selected functions list if it is unselected
      const index = this.selectedFunctionsList.findIndex((f: ModuleFunction) => f.id === func.id);
      if (index !== -1) {
        this.selectedFunctionsList.splice(index, 1);
      }
    }
  }
  

  
  onSubmit(){
    console.log(this.form)
    if (this.form.valid && this.selectedFunctionsList.length > 0) {
      if(this.group.gId===0){}
      this.group.gName = this.form.value.gName;
      this.group.gDescription = this.form.value.gDescription;
      this.group.liste_function = this.selectedFunctionsList;
      this.group.module_groups = this.selectedModules;
      
      
      if (this.group.gId === 0) {
        this.group.dateCreation = new Date();
        this.dataService.addGroup(this.group).subscribe(group => {
          this.router.navigate(['/group']);;
        });
      } else {
        this.group.dateModif = new Date();
        this.dataService.updateGroup(this.group, this.group.gId);
      }
    }
  }
  selectAllFunctions(checked: boolean) {
    this.selectedFunctionsList = [];
  
    // Iterate through all the submodules and functions
    for (const module of this.selectedModules) {
      for (const submodule of module.list_sub_modules) {
        for (const func of submodule.functions) {
          // Set the selected state of each function to the checkbox value
          func.selected = checked;
  
          // Add the function to the selected functions list if it is selected
          if (checked) {
            this.selectedFunctionsList.push(func);
          }
        }
      }
    }
  }
  onCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    this.selectAllFunctions(checked);
  }
  

  

}
