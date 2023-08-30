import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FunctionService } from 'src/app/services/function.service';
import { ModuleServicesService } from 'src/app/services/module-services.service';
import { SubmoduleService } from 'src/app/services/submodule.service';
import { Module } from 'src/model/Module';
import { ModuleFunction } from 'src/model/ModuleFunction';
import { SubModule } from 'src/model/SubModule';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-submoduleform',
  templateUrl: './submoduleform.component.html',
  styleUrls: ['./submoduleform.component.css']
})
export class SubmoduleformComponent implements OnInit{

  // submoduleForm!: FormGroup;
  // functions: ModuleFunction[] = [];
  // selectedFunctions: ModuleFunction[] = [];
  // submodule!: SubModule;

  addSubmoduleForm!: FormGroup;
  modules: any[] = [];
  moduleCtrl = new FormControl();
  filteredModules!: Observable<any[]>;


  constructor( private formBuilder: FormBuilder,
    private submoduleService: SubmoduleService,
    private functionService: FunctionService,
    private moduleService:ModuleServicesService,
    private dialogRef: MatDialogRef<SubmoduleformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    

  

    ngOnInit() :void{
  
      this.addSubmoduleForm = this.formBuilder.group({
        subModuleName: ['', Validators.required],
       
        moduleId: ['', Validators.required]
      });
  
      this.moduleService.getAllModules().subscribe(
        data => {
          this.modules = data;
        },
        error => {
          console.log('Error retrieving modules', error);
        }
      );
  
      this.filteredModules = this.moduleCtrl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterModules(value))
      );

      
  }
  
  onSubmit(): void {
    console.log(this.moduleCtrl.value)
    // if (this.addSubmoduleForm.invalid || !this.moduleCtrl.value) {
    //   return;
    // }
  
    const selectedModule = this.moduleCtrl.value;
    const newSubmodule = {
      subModuleName: this.addSubmoduleForm.controls['subModuleName'].value,
      module: {
        id: selectedModule.id
      }
    };

    console.log(newSubmodule)
  
    this.submoduleService.addSubmodule(newSubmodule).subscribe(
      response => {
        console.log('New submodule added:', response);
        this.dialogRef.close();
        // handle success
      },
      error => {
        console.error('Error adding submodule:', error);
        // handle error
      }
    );
  }
  

  private _filterModules(value: string): any[] {
    const filterValue = value;
    return this.modules.filter(module => module.moduleName.toLowerCase().includes(filterValue));
  }
  
  }  

  