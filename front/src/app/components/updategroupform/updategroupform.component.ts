import { Component,Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GroupModuleService } from 'src/app/services/group-module.service';
import { ModuleServicesService } from 'src/app/services/module-services.service';

@Component({
  selector: 'app-updategroupform',
  templateUrl: './updategroupform.component.html',
  styleUrls: ['./updategroupform.component.css']
})
export class UpdategroupformComponent implements OnInit{

  updateGroupForm!: FormGroup;
  groups: any[] = [];
  modules: any[] = [];

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdategroupformComponent>,
    private groupService:GroupModuleService,
    private moduleService:ModuleServicesService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){}

  ngOnInit(): void {
    this.updateGroupForm=this.formBuilder.group({
      gName:['', Validators.required],
      gDescription:['', Validators.required],
    })
    this.moduleService.getAllModules().subscribe(
      data => {
        this.modules = data;
      },
      error => {
        console.log('Error retrieving modules', error);
      }
    );
    console.log(this.data)
    this.updateGroupForm.patchValue(this.data)

  }

  onSubmit() {
    const updatedgroup = {
      gid: this.data.gId,
      gName: this.updateGroupForm.controls['gName'] ? this.updateGroupForm.controls['gName'].value : '',
      gDescription: this.updateGroupForm.controls['gDescription'] ? this.updateGroupForm.controls['gDescription'].value : '',
    };
  
    console.log('id:', updatedgroup.gid); // Add this line
  
    this.groupService.updateGroup(updatedgroup, updatedgroup.gid).subscribe(
      response => {
        console.log(this.data);
        this.data = response;
        console.log('Group updated:', response);
        this.dialogRef.close();
      },
      error => {
        console.error('Error updating group:', error);
      }
    );
  }
  
  
  cancel(){
    this.dialogRef.close();
  }

}