import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Module } from 'src/model/Module';
import { ModuleServicesService } from 'src/app/services/module-services.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModuleFormComponent } from '../moduleform/moduleform.component';
import { MatDialog } from '@angular/material/dialog';
import { SubmoduleformComponent } from '../submoduleform/submoduleform.component';
import { FonctionformComponent } from '../fonctionform/fonctionform.component';
import { SubmoduleService } from 'src/app/services/submodule.service';
import { FunctionService } from 'src/app/services/function.service';
import { UpdatesubmodulemodalComponent } from '../updatesubmodulemodal/updatesubmodulemodal.component';
import { UpdatefunctionmodalComponent } from '../updatefunctionmodal/updatefunctionmodal.component';
import { RapportComponent } from 'src/app/components/rapport/rapport.component';
import { Router } from '@angular/router';
import { ConfirmationDialogComponentComponent } from '../confirmation-dialog-component/confirmation-dialog-component.component';
import { Subscription } from 'rxjs';
//import { UpdatefunctionmodalComponent } from '../updatesubmodulemodal/updatesubmodulemodal.component';


@Component({
  selector: 'app-nested-grid',
  templateUrl: './nested-grid.component.html',
  styleUrls: ['./nested-grid.component.css']
})
export class NestedGridComponent implements OnInit, AfterViewInit {
  @ViewChild(Table) table: Table | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  modules: Module[] = [];
  dataSource: any;
  private subscriptions: Subscription[] = [];
  

  constructor(private primengConfig: PrimeNGConfig,
    private dataService: ModuleServicesService,
    private submoduleService:SubmoduleService,
    private functionService:FunctionService,
    public dialog: MatDialog,
    private router:Router) {}

    onSelect(func:any){
      this.router.navigate(['/function',func.id])
    }

    ngOnInit(): void {
      this.submoduleService.getAllSubModules().subscribe(data=>{
        console.log(data)
      })

      this.functionService.getAllFunction().subscribe(data=>console.log(data))


      this.dataService.getAllModules().subscribe(data => {
        this.modules = data;
        this.dataSource = new MatTableDataSource(this.modules);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        console.log(this.modules)      
      });
    }
  

  ngAfterViewInit(): void {
    this.primengConfig.ripple = true;
  }

  toggleSubModules(module: any) {
    module.expanded = !module.expanded;
  }

  editElement(module: Module) {
    const dialogRef = this.dialog.open(ModuleFormComponent, {
      width: '350px', 
      data: { module: module }
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
    console.log(module)
  }
  
  deleteElement(id:any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '350px',
      data: 'Are you sure you want to delete this Module?'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteModule(id).subscribe(
          res=>{this.ngOnInit()},
          err=>{console.log(err);}
        )
      }
    });
    
  }

  deleteSubmodule(id:any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '350px',
      data: 'Are you sure you want to delete this SubModule?'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submoduleService.deleteSubModule(id).subscribe(res=>{
          this.ngOnInit()
        })
      }
    });   
  }


  deleteFunction(id:any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '350px',
      data: 'Are you sure you want to delete this Function?'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.functionService.deleteFonction(id).subscribe(res=>{
          this.ngOnInit()
        })
      }
    }); 
    
  }

  openUpdateSubmoduleModal(row:any) {
    const dialogRef = this.dialog.open(UpdatesubmodulemodalComponent, {
      width: '400px',
      data: row
     
    });
  
   
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openUpdateFunctionModal(row:any) {
    const dialogRef = this.dialog.open(UpdatefunctionmodalComponent, {
      width: '400px',
      data: row
     
    });
  
   
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openModuleForm(): void { 
    const dialogRef = this.dialog.open(ModuleFormComponent, {
      width: '350px', 
      data: {}
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openSubModuleForm(): void { 
    const dialogRef = this.dialog.open(SubmoduleformComponent, {
      width: '400px', 
      data: {}
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openRapportForm():void {
    const dialogRef=this.dialog.open(RapportComponent,{
      width: '400px', 
      data: {}
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
    }
  

  openFonctionForm(): void { 
    const dialogRef = this.dialog.open(FonctionformComponent, {
      width: '350px', 
      height: '250px',
      data: {}
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  
}