import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupModuleService } from 'src/app/services/group-module.service';
import { MatDialog } from '@angular/material/dialog';
import { AssignModuleDialogComponent } from '../assign-module-dialog/assign-module-dialog.component';
import { AssignfunctiondialogComponent } from '../assignfunctiondialog/assignfunctiondialog.component';
import { ConfirmationDialogComponentComponent } from '../confirmation-dialog-component/confirmation-dialog-component.component';

@Component({
  selector: 'app-groupdetails',
  templateUrl: './groupdetails.component.html',
  styleUrls: ['./groupdetails.component.css']
})
export class GroupdetailsComponent implements OnInit{
  groupId!: any;
  moduleId!: any;
  modules:any;
  fonctions:any;

  constructor(private route:ActivatedRoute,
    private groupService:GroupModuleService,
    public dialog: MatDialog){}

    openDialog() {
      const dialogRef = this.dialog.open(AssignModuleDialogComponent, {
        width: '500px',
        data: { groupId: this.groupId },
        
      });
      
  
      dialogRef.afterClosed().subscribe((result) => {
        this.ngOnInit()
        console.log('The dialog was closed');
      });
    }

    openFctDialog() {
      const dialogRef = this.dialog.open(AssignfunctiondialogComponent, {
        width: '500px',
        data: { groupId: this.groupId },
        
      });
      
  
      dialogRef.afterClosed().subscribe((result) => {
        this.ngOnInit()
        console.log('The dialog was closed');
      });
    }

    onDeleteFonction(groupId:any,  functionId:any){
      const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
        width: '350px',
        data: 'Are you sure you want to delete this Function?'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.groupService.removeFunctionFromGroup(groupId,functionId).subscribe(
            response => {
              console.log('Function removed from Group successfully.');
              this.ngOnInit()
              // Do something else here if needed, like refreshing the page
            },
            error => {
              console.log('Error removing Function from Group:', error);
            }
          );
        }
      });
      
    }


    onDeleteModule(groupId:any,  moduleId:any){
      const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
        width: '350px',
        data: 'Are you sure you want to delete this Module?'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.groupService.removeModuleFromGroup(groupId,moduleId).subscribe(
            response => {
              console.log('Module removed from Group successfully.');
              this.ngOnInit()
              // Do something else here if needed, like refreshing the page
            },
            error => {
              console.log('Error removing Module from Group:', error);
            }
          );

        }})
    
    }



  ngOnInit(): void{
    this.groupId =this.route.snapshot.paramMap.get('id');
    this.groupService.getModulesByGroup(this.groupId).subscribe(data=>{
      this.modules=data
    })

    this.groupService.getFunctionsByGroup(this.groupId).subscribe(data=>{
      this.fonctions=data
    })

  }

}