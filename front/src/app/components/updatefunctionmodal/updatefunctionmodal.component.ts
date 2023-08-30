import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FunctionService } from 'src/app/services/function.service';
import { ModuleServicesService } from 'src/app/services/module-services.service';
import { SubmoduleService } from 'src/app/services/submodule.service';

@Component({
  selector: 'app-updatefunctionmodal',
  templateUrl: './updatefunctionmodal.component.html',
  styleUrls: ['./updatefunctionmodal.component.css']
})
export class UpdatefunctionmodalComponent implements OnInit{
  
  updateFunctionForm!: FormGroup;
  modules: any[] = [];

  constructor(private formBuilder: FormBuilder,
    private submoduleService: SubmoduleService,
    private moduleService:ModuleServicesService,
    private functionService:FunctionService,
    private dialogRef: MatDialogRef<UpdatefunctionmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
     
}

  ngOnInit(): void {
    console.log(this.data)
    this.updateFunctionForm = this.formBuilder.group({
      functionName: ['', Validators.required],
      

    });
    
    this.moduleService.getAllModules().subscribe(
      data => {
        this.modules = data;
      },
      error => {
        console.log('Error retrieving modules', error);
      }
    );
    
    this.updateFunctionForm.patchValue(this.data)

   
    
    
  }

  onSubmit(): void {
    
    if (this.updateFunctionForm.invalid) {
      return;
    }
  
    const updatedFunction = {
      id: this.data.id,
      functionName: this.updateFunctionForm.controls['functionName'] ? this.updateFunctionForm.controls['functionName'].value : '',
      subModule: {
        id: this.data.subModule
      }
    };
  
    this.functionService.updateFonction(updatedFunction.id,updatedFunction).subscribe(
      response => {
        this.data=response
        console.log('Function updated:', response);
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