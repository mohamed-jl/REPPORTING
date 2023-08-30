import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModuleServicesService } from 'src/app/services/module-services.service';
import { GroupModuleService } from 'src/app/services/group-module.service';

@Component({
  selector: 'app-assign-module-dialog',
  templateUrl: './assign-module-dialog.component.html',
  styleUrls: ['./assign-module-dialog.component.css']
})
export class AssignModuleDialogComponent {

  modules: any;
  selectedModule:any
  constructor(
    public dialogRef: MatDialogRef<AssignModuleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private moduleService: ModuleServicesService,
    private groupModuleService:GroupModuleService
  ) {}

  onAssignClick(): void {
    const groupId = this.data.groupId;
    const moduleId = this.selectedModule.id;
    console.log(moduleId)
    this.groupModuleService.addModuleToGroup(groupId, moduleId).subscribe(() => {
      console.log('Module assigned successfully');
      this.loadModulesByGroup();
      this.dialogRef.close();
    }, error => {
      console.error('Error occurred while assigning module:', error);
    });
  }

  loadModulesByGroup(){
    this.groupModuleService.getModulesByGroup(this.data.groupId).subscribe((data) => {
      this.modules = data;
      console.log(data)
    });
  }

  ngOnInit(): void {
    this.loadModulesByGroup();
    this.moduleService.getAllModules().subscribe((data) => {
      this.modules = data;
    });

    

   
  }

}