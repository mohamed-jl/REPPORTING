import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog ,MatDialogConfig} from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table'
import { GroupModuleService } from 'src/app/services/group-module.service';
import { group_module } from 'src/model/group_module';
import { GroupFormComponent } from '../groupform/groupform.component';
import { Router } from '@angular/router';
import { ConfirmationDialogComponentComponent } from '../confirmation-dialog-component/confirmation-dialog-component.component';
import { UpdategroupformComponent } from '../updategroupform/updategroupform.component';



@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  listGroup!: Array<group_module>;
  dataSource!: MatTableDataSource<group_module>;
  oldGroup!: group_module;
  displayedColumns: string[] = ['gId', 'gName', 'gDescription', 'dateCreation', 'dateModif', 'etat', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;

  constructor(private dataService: GroupModuleService,
    public dialog: MatDialog,private router: Router) {}

  ngOnInit(): void {
    this.dataService.getGroup().subscribe(d => {
      this.listGroup = d;
      console.log(this.listGroup)
      this.dataSource = new MatTableDataSource(this.listGroup);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  onSelect(element:any){
    this.router.navigate(['/groupe',element.gId])
  }

  openNestedGrid(): void {
    this.router.navigate(['/group/add']);
  }
  

  openForm(): void { 
    const dialogRef = this.dialog.open(GroupFormComponent, {
      width: '350px', 
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(); 
    });
  }

  editElement(id: number){
    this.router.navigate(['/group/',id]);
  }
  
  openUpdateGroupModal(row:any) {
    const dialogRef = this.dialog.open(UpdategroupformComponent, {
      width: '400px',
      data: row
    });
  
   
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  
  deleteElement(id:number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '350px',
      data: 'Are you sure you want to delete this Group?'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteGroup(id).subscribe(
          res=>{this.ngOnInit()},
          err=>{console.log(err);}
        )
      }
    });
  }

  

}