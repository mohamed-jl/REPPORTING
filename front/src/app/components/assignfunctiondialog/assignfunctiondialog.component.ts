import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FunctionService } from 'src/app/services/function.service';
import { GroupModuleService } from 'src/app/services/group-module.service';

@Component({
  selector: 'app-assignfunctiondialog',
  templateUrl: './assignfunctiondialog.component.html',
  styleUrls: ['./assignfunctiondialog.component.css']
})
export class AssignfunctiondialogComponent {

  fonctions: any;
  selectedFonction:any
  constructor(
    public dialogRef: MatDialogRef<AssignfunctiondialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private functionService: FunctionService,
    private groupModuleService:GroupModuleService
  ) {}

  onAssignClick(): void {
    const groupId = this.data.groupId;
    const functionId = this.selectedFonction.id;
    console.log(functionId)
    this.groupModuleService.addFonctionToGroup(groupId, functionId).subscribe(() => {
      console.log('Function assigned successfully');
      this.dialogRef.close();
    }, error => {
      console.error('Error occurred while assigning function:', error);
    });
  }

  ngOnInit(): void {
    this.functionService.getAllFunction().subscribe((data) => {
      this.fonctions = data;
    });

    

   
  }

}