import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FunctionService } from 'src/app/services/function.service';
import { ModuleServicesService } from 'src/app/services/module-services.service';
import { SubmoduleService } from 'src/app/services/submodule.service';
import { ModuleFunction } from 'src/model/ModuleFunction';
import { SubModule } from 'src/model/SubModule';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-fonctionform',
  templateUrl: './fonctionform.component.html',
  styleUrls: ['./fonctionform.component.css']
})
export class FonctionformComponent implements OnInit{

   functionForm!: FormGroup;
   submodules: any[] = [];
   modules: any[] = [];
   fonctions:any[]=[]
  // selectedSubmodules: SubModule[] = [];
  // fonction!:ModuleFunction
  submoduleCtrl = new FormControl();
filteredSubmodules!: Observable<any[]>;


  constructor(private formBuilder: FormBuilder,
    private fonctionService:FunctionService,
    private submoduleService:SubmoduleService,
    private dialogRef: MatDialogRef<FonctionformComponent>,
    private moduleService: ModuleServicesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  
    ) {}

  

    ngOnInit() {
      this.functionForm = this.formBuilder.group({
        functionName: ['', Validators.required],
        submoduleId: ['', Validators.required],
      });

      this.moduleService.getAllModules().subscribe(
        data => {
          this.modules = data;
        },
        error => {
          console.log('Error retrieving modules', error);
        }
      );

      this.submoduleService.getAllSubModules().subscribe(
        (data: (number | SubModule)[]) => { // Specify the type of 'data' as an array of 'number' or 'SubModule'
          // Process each item in the data array
          data.forEach((item: number | SubModule) => {
            if (typeof item === 'number') {
              // If the item is a number, make a call to getSubModuleById and add it to this.submodules
              this.submoduleService.getSubModuleById(item).subscribe(
                submoduleData => {
                  const submodule: any = submoduleData; // Assuming submoduleData is of type SubModule
                  this.submodules.push(submodule);
                },
                error => {
                  console.log('Error retrieving submodule by ID', error);
                }
              );
            } else if (typeof item === 'object') {
              // If the item is an object, add it directly to this.submodules
              const submodule: SubModule = item; // Assuming item is of type SubModule
              this.submodules.push(submodule);
            }
          });
          console.log(this.submodules);
        },
        error => {
          console.log('Error retrieving submodules', error);
        }
      );
      

      this.fonctionService.getAllFunction().subscribe(
        data => {
          this.fonctions = data;
        },
        error => {
          console.log('Error retrieving fonctions', error);
        }
      );
      this.filteredSubmodules = this.submoduleCtrl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterSubmodules(value))
      );
      
    }


    onSubmit(): void {
      // if (this.functionForm.invalid || !this.submoduleCtrl.value) {
      //   return;
      // }
      console.log(this.submoduleCtrl.value.subModuleName)
      const selectedSubmodule = this.submoduleCtrl.value;
      const newFunction = {
        functionName: this.functionForm.controls['functionName'].value,
        subModule: {
          id: selectedSubmodule.id
        }
      };
    
      this.fonctionService.addFonction(newFunction).subscribe(
        response => {
          console.log('New fonction added:', response);
          this.dialogRef.close();
          // handle success
        },
        error => {
          console.error('Error adding fonction:', error);
          // handle error
        }
      );
    }
    

    private _filterSubmodules(value: string): any[] {
      const filterValue = value;
      return this.submodules.filter(submodule => submodule.subModuleName.toLowerCase().includes(filterValue));
    }
    

    cancel(){
      this.dialogRef.close();
    }
  }

