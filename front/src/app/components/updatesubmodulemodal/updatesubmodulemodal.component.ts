import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubmoduleService } from 'src/app/services/submodule.service';
import { SubModule } from 'src/model/SubModule';
import { ModuleServicesService } from 'src/app/services/module-services.service';
@Component({
  selector: 'app-updatesubmodulemodal',
  templateUrl: './updatesubmodulemodal.component.html',
  styleUrls: ['./updatesubmodulemodal.component.css']
})
export class UpdatesubmodulemodalComponent implements OnInit {

  updateSubmoduleForm!: FormGroup;
  modules: any[] = [];


  constructor(private formBuilder: FormBuilder,
              private submoduleService: SubmoduleService,
              private moduleService:ModuleServicesService,
              private dialogRef: MatDialogRef<UpdatesubmodulemodalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                
               
  }

  ngOnInit(): void {
    this.updateSubmoduleForm = this.formBuilder.group({
      subModuleName: ['', Validators.required],
      path: ['', Validators.required],
      
    });
    this.moduleService.getAllModules().subscribe(
      data => {
        this.modules = data;
      },
      error => {
        console.log('Error retrieving modules', error);
      }
    );
    this.updateSubmoduleForm.patchValue(this.data)

   
    
  }

  

  onSubmit(): void {
    if (this.updateSubmoduleForm.invalid) {
      return;
    }
  
    const updatedSubmodule = {
      id: this.data.id,
      subModuleName: this.updateSubmoduleForm.controls['subModuleName'] ? this.updateSubmoduleForm.controls['subModuleName'].value : '',
      path: this.updateSubmoduleForm.controls['path'] ? this.updateSubmoduleForm.controls['path'].value : '',
      module: {
         id: this.data.module
      }
    };
  
    this.submoduleService.updateSubModule(updatedSubmodule.id,updatedSubmodule).subscribe(
      response => {
        this.data=response
        console.log('Submodule updated:', response);
        this.dialogRef.close();
        
      },
      error => {
        console.error('Error updating submodule:', error);
      }
    );
  }
  cancel(){
    this.dialogRef.close();
  }
  
}